use anchor_lang::prelude::*;

declare_id!("7LWjAqHCx1zepqFfNF6Db3gn9DRoKn6nydSJjHF1FVoP");

#[program]
pub mod nft_liquidation_tokenss {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
