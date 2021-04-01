#include "vntlib.h"
                                  
typedef struct
{
    string Infohash;        
    string State;    
    uint64 Date;     
} CfInfoHash;

KEY array(CfInfoHash) cfData;               

KEY mapping(string,uint64)cfData_r;                                                     

KEY string var1;
KEY string var0="ERROR",var2="REMOKE",var3="PASS",var4="SUCCESS";

KEY mapping(string,string) ScPkMap;                                                           

KEY int32   cfSize=0;                  

                                             

                         
KEY address owner;

                

void keynfs4phmn(){
AddKeyInfo( &cfData_r.value, 4, &cfData_r, 9, false);
AddKeyInfo( &cfData_r.value, 4, &cfData_r.key, 6, false);
AddKeyInfo( &var0, 6, &var0, 9, false);
AddKeyInfo( &cfSize, 1, &cfSize, 9, false);
AddKeyInfo( &var3, 6, &var3, 9, false);
AddKeyInfo( &ScPkMap.value, 6, &ScPkMap, 9, false);
AddKeyInfo( &ScPkMap.value, 6, &ScPkMap.key, 6, false);
AddKeyInfo( &cfData.value.Date, 4, &cfData, 9, false);
AddKeyInfo( &cfData.value.Date, 4, &cfData.index, 4, true);
AddKeyInfo( &cfData.value.Date, 4, &cfData.value.Date, 9, false);
AddKeyInfo( &var2, 6, &var2, 9, false);
AddKeyInfo( &var4, 6, &var4, 9, false);
AddKeyInfo( &cfData.value.Infohash, 6, &cfData, 9, false);
AddKeyInfo( &cfData.value.Infohash, 6, &cfData.index, 4, true);
AddKeyInfo( &cfData.value.Infohash, 6, &cfData.value.Infohash, 9, false);
AddKeyInfo( &cfData.value.State, 6, &cfData, 9, false);
AddKeyInfo( &cfData.value.State, 6, &cfData.index, 4, true);
AddKeyInfo( &cfData.value.State, 6, &cfData.value.State, 9, false);
AddKeyInfo( &cfData.length, 4, &cfData, 9, false);
AddKeyInfo( &var1, 6, &var1, 9, false);
AddKeyInfo( &owner, 7, &owner, 9, false);
}
constructor $stucontract()
{
keynfs4phmn();
InitializeVariables();
    owner = GetSender();
}

               
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

               
bool SchoolConfirm(string Schoolname,string ScPk){
    ScPkMap.key=Schoolname;
    while (Equal(ScPkMap.value,ScPk))
    {
        return true;
    }
    return false;
}

                  
void AdminConfirm(){
    address sender = GetSender();
    Require(Equal(sender, owner) == true, "Only the owner can operate");
}

                     
uint64 CertificateExist(string InfoH){
    cfData_r.key=InfoH;
    cfData.index=cfData_r.value;
    if(Equal(cfData.value.Infohash,InfoH))
    {
        return cfData_r.value;
    }
    return -1;
}

                     
bool SchoolExist(string schoolIn){
    ScPkMap.key=schoolIn;
    if (Equal(ScPkMap.value,var1))
    {
        return false;
    }
    return true;
}

               
MUTABLE
bool SchoolRegister(string SchoolIn,string SchoolPk){
keynfs4phmn();
    AdminConfirm();
        if (SchoolExist(SchoolIn))
        {
            ScPkMap.key=SchoolIn;
            ScPkMap.value=SchoolPk;
            return true;
        }       
    
    return false;
}

               
MUTABLE
string RegisterFunc(string scname,string infohash){
keynfs4phmn();

                                                  
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
            if(cfData.value.State==var3) return Concat(var3,FromU64(id));            
            else if (Date<cfData.value.Date) return Concat(var2,FromU64(id));         
            {cfData.value.State=var3;cfData.value.Date=Date;return Concat(var4,FromU64(id));               
            }
        }
        cfData.index=id;
        cfData.value.Infohash=infohash;
        cfData.value.State=var3;
        cfData.value.Date=Date;
        cfData_r.value=id;
        return Concat(var4,FromU64(id));               
    }
    return Concat(var0," SN");                     
}

               
MUTABLE
bool RemokeFunc(string schoolname,uint64 id,string infohash,uint64 date){
keynfs4phmn();
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
