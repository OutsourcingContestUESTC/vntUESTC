#include "vntlib.h"
#include <string.h>
// 每个学生信息的结构体
typedef struct
{
    string Infohash;        
    string Static;    
    string Date;     
} CfInfoHash;

KEY array(CfInfoHash) cfData;   //证书表

KEY mapping(string,uint64)cfData_r; //证书反映射表string1InfoHash       uint64 ID

KEY string SchoolName,SchoolPK;

KEY mapping(string,string) ScPkMap;   //学校权限表string1 schoolname    string2 schoolpk

KEY int32   cfSize=0;   //证书数量

KEY const address AdminPk;  //公司权限


//证书验证
bool CerticateVerification(uint64 ID,string infohash){
    cfData.index=ID;
    if (Equal(infohash,cfData.value.Infohash)==0)
    {
       if (Equal("PASS",cfData.value.Static)==0)
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
    if (SenderPk==AdminPk)
    {
        return true;
    }
    return false;
    cfData.value.Infohash
}

//证书是否存在
uint64 CertificateExist(string InfoH){
    cfData_r.key=InfoH;
    cfData.index=cfData_r.value;
    if(cfData.value.Infohash==InfoH)
    {
        return cfData_r.value;
    }
    return -1;
}


// 系统的全部用户
KEY uint64 stucounts;
KEY array(string) useraddresses; // 系统的全部用户, 可以通过用户地址获取ipfshash与filehash

// 部署合约的地址
KEY address owner;

// 构造函数
constructor $stucontract()
{
    owner = GetSender();
}

// 存储数据
MUTABLE
void PutStore(string useraddr, string name, string gender, string snum, string IDnum, string department, string academy, string major,string grade,string timestamp)
{
    // 获取执行该方法交易的用户地址
    address sender = GetSender();
    
    //存储数据
    User_Edu_doc.key = sender;

    User_Edu_doc.value.IDnum.index = User_Edu_doc.value.nowlength;        
    User_Edu_doc.value.IDnum.value.name = name;
    User_Edu_doc.value.IDnum.value.gender = gender;
    User_Edu_doc.value.IDnum.value.snum = snum;
    User_Edu_doc.value.IDnum.value.IDnum = IDnum;
    User_Edu_doc.value.IDnum.value.department = department;
    User_Edu_doc.value.IDnum.value.academy = academy;
    User_Edu_doc.value.IDnum.value.major = major;
    User_Edu_doc.value.IDnum.value.grade=grade;
    User_Edu_doc.value.IDnum.value.timestamp=timestamp;
	User_Edu_doc.value.nowlength = User_Edu_doc.value.nowlength + 1;
      

    // 存储系统用户
    if(usercounts == 0){
	useraddresses.length = 100;
	useraddresses.index = usercounts;
	useraddresses.value = useraddr;
	usercounts = usercounts + 1;
    }else{
	useraddresses.index = usercounts;
	useraddresses.value = useraddr;
	usercounts = usercounts + 1;
    }
}

// 查询单个学生的信息
UNMUTABLE
string GetStuEduInfo()
{
    string name = "";
    string gender = "";
//  string snum= "";     学号
    string IDnum ="";
    string department="";
    string academy="";
    string major="";
    string grade="";
    string timestamp = "";

    
    string result = "";

    User_Edu_doc.key = GetSender();
    uint64 nowlength = User_Edu_doc.value.nowlength;

	User_Edu_doc.value.IDnum.index = IDnum;
	name = User_Edu_doc.value.IDnum.value.name;
	gender = User_Edu_doc.value.IDnum.value.gender;
    //snum=User_Edu_doc.value.IDnum.value.snum;         学号似乎无用
    IDnum=User_Edu_doc.value.IDnum.value.IDnum;
    department=User_Edu_doc.value.IDnum.value.department;
    academy=User_Edu_doc.value.IDnum.value.academy;
    major=User_Edu_doc.value.IDnum.value.major;
    grade=User_Edu_doc.value.IDnum.value.grade;
	timestamp = User_Edu_doc.value.IDnum.value.timestamp;

	result = Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(result, name), "|"), gender), "|"),IDnum), "|"), department), "|"),academy), "|"), major), "|"), grade), "-");
//待改

    // 拼接成字符串
    PrintStr("The stu's edu_doc: ", result);


    //转换为json（待完善
    




    return result;
}

/*
// 返回所有的用户
UNMUTABLE
string Getalluser()
{
	string result = "";
	for(uint64 i=0; i<usercounts; i++){
		useraddresses.index = i;
		result = Concat(Concat(result, useraddresses.value), "|");
	}
	return	result;
}
*/