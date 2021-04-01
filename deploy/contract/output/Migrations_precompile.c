#include "vntlib.h"

KEY address owner;
KEY uint32 last_completed_migration;

void key6bl0lkh9(){
AddKeyInfo( &owner, 7, &owner, 9, false);
AddKeyInfo( &last_completed_migration, 3, &last_completed_migration, 9, false);
}
constructor Migrations()
{
key6bl0lkh9();
InitializeVariables();
  owner = GetSender();
}

void onlyOwner()
{
  Require(Equal(owner, GetSender()), "is not owner");
}

MUTABLE
void setCompleted(uint32 completed)
{
key6bl0lkh9();
  onlyOwner();
  last_completed_migration = completed;
}

UNMUTABLE
uint32 get_last_completed_migration()
{
key6bl0lkh9();
  return last_completed_migration;
}
