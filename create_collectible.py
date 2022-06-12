#!/usr/bin/python3
from brownie import SimpleCollectible,accounts,network,config
from scripts.helpful_scripts import OPENSEA_FORMAT
sample_token_uri="https://pay2meta.com/public/nft_100.json"
def main():
   dev = accounts.add(config["wallets"]["from_key"])
   print(network.show_active())
   simple_collectible=SimpleCollectible[len(SimpleCollectible)-1]
   token_id=simple_collectible.tokenCounter()
   transaction=simple_collectible.createCollectible(sample_token_uri,{"from":dev})
   transaction.wait(1)
   print(
       "Listo,tu NFT fue generado exitosamente{}".format(
           OPENSEA_FORMAT.Format(simple_collectible.address,token_id)
   )

   )