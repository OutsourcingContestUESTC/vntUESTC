#include "vntlib.h"
// 每个学生信息的结构体
typedef struct
{
    string Infohash;        
    string State;    
    uint64 Date;     
} CfInfoHash;

KEY array(CfInfoHash) cfData;   //证书表

KEY mapping(string,uint64)cfData_r; //证书反映射表string1InfoHash       uint64 ID

KEY string var1;
KEY string var0="ERROR",var2="REMOKE",var3="PASS",var4="SUCCESS";

KEY mapping(string,string) ScPkMap;   //学校权限表string1 schoolname    string2 schoolpk

KEY int32   cfSize=0;   //证书数量

KEY const address AdminPk;  //公司权限

// 部署合约的地址
KEY address owner;

//证书验证
bool CerticateVerification(uint64 ID,string infohash){
    cfData.index=ID;
    if (Equal(infohash,cfData.value.Infohash)==0)
    {
       if (Equal("PASS",cfData.value.State)==0)
       {
           return true;
       }
       else return false;
    }
    return false;

}

//学校确认
bool SchoolConfirm(string Schoolname,string ScPk){
    ScPkMap.key=Schoolname;
    while (Equal(ScPkMap.value,ScPk))
    {
        return true;
    }
    return false;
}

//管理员验证
bool AdminConfirm(address SenderPk){
    if (Equal(SenderPk,AdminPk))
    {
        return true;
    }
    return false;

}

//证书是否存在
uint64 CertificateExist(string InfoH){
    cfData_r.key=InfoH;
    cfData.index=cfData_r.value;
    if(Equal(cfData.value.Infohash,InfoH))
    {
        return cfData_r.value;
    }
    return -1;
}

//学校是否存在
bool SchoolExist(string schoolIn){
    ScPkMap.key=schoolIn;
    if (Equal(ScPkMap.value,var1))
    {
        return false;
    }
    return true;
}

//学校注册
bool SchoolRegister(string SchoolIn,string SchoolPk){
    if(AdminConfirm(GetSender())){
        if (SchoolExist(SchoolIn))
        {
            ScPkMap.key=SchoolIn;
            ScPkMap.value=SchoolPk;
            return true;
        }       
    }
    return false;
}

//证书注册
MUTABLE
string RegisterFunc(string scname,string infohash){

    // 获取执行该方法交易的用户地址
    address sender = GetSender();

    string scpk;
    uint64 Date=GetTimestamp();
    ScPkMap.key=scname;
    scpk=ScPkMap.value;
    if(SchoolConfirm(scname,scpk)){
        uint64 id=CertificateExist(infohash);
        if (id==-1)
        {
            id=cfSize;cfSize++;
        }
        else {
            cfData.index=id;
            if(cfData.value.State==var3) return Concat(var3,FromU64(id));//已存在
            else if (Date<cfData.value.Date) return Concat(var2,FromU64(id));//冻结
            {cfData.value.State=var3;cfData.value.Date=Date;return Concat(var4,FromU64(id));//注册成功
            }
        }
        cfData.index=id;
        cfData.value.Infohash=infohash;
        cfData.value.State=var3;
        cfData.value.Date=Date;
        cfData_r.value=id;
        return Concat(var4,FromU64(id));//注册成功
    }
    return Concat(var0," SN");//学校登录失败
}

//证书撤销
void RemokeFunc(string schoolname,uint64 id,string infohash,uint64 date){
    string scpk;
    ScPkMap.key=schoolname;
    scpk=ScPkMap.value;
    if(SchoolConfirm(schoolname,scpk)){
        cfData.index=id;
        if(Equal(cfData.value.Infohash,infohash)){
            cfData.value.State=var2;
            cfData.value.Date=date;
            return true;
        }
    }
    return false;
}

// 构造函数
constructor $stucontract()
{
    owner = GetSender();
}