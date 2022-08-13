# @mintdrop/contracts

There are a few assumptions we made about group minting:

- Minting is always paired with the msg.sender, we don't allow minting to arbitrary token owners.
- The general controls a collection owner wants:
  - Mint time (no wallet can mint before this date if part of group)
  - Reserved count
  - Max mints / wallet

Todo: 

- [ ] group mint (vip, whatever)
  - [x] check total supply
  - [x] check max per wallet
  - [ ] check reserve count
  - [ ] check finish date
  - [ ] update used signatures
  - [ ] super._mint
- [ ] public mint
  - [x] check total supply
  - [ ] check reserve count
  - [ ] check start date
  - [ ] check finish date
  - [ ] super._mint
- [ ] remaining mint
  - [ ] mint remaining reserved count