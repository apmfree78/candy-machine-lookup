# Search for NFTs on Solana

This app allows you to search for Candy Machine v2 NFTs on Solana network.

Note: **Current set to work on Solana devnet**

## Place valid Candy Machine v2 devnet id in the search box and click 'search'.

You can use these valid Candy Machine IDs to test out the app:

6HzfKuyBExGqE6kGjSj8UyY4REwGRm1RgHwAsK5ws6Up

4EYvnxkcBCySX2Da39TL8zDMjeWRd2PYPoDyyn4XHaU2

Results will show stats about the Candy Machine, and list the NFTs below.

*NFT list is paginated, with up to 9 NFTs per page.*

## Few Features of this App

- All inputs are validated with regex to make sure input is valid Solana address
- Loading state is initiated after user clicks Search, demonstarted by spinner
- Candy Machine data is neatly displayed in 3 column table
- NFTs are displayed neatly in 3 x 3 grid
- NFTs display is paginated, with 9 results per page
- 16 unit tests are setup as a starting point for automated testing

## Future Goals

- Impliment React Query to take advantage of cache and pre-fetching of NFTs
- Expand unit tests to cover edge cases and testing pagination
- Test application on mainnet-beta
