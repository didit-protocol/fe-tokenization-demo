# Tokenization Platform in XDC Network

## **0. Links**

- Live demo: https://development.d2ky52uvjxrx7m.amplifyapp.com/
- Swagger: https://tokenization.staging.didit.me/platform/system/schema/swagger-ui/

## **1. Objective**

To build a platform enabling users to buy and sell tokenized securities in _XDC Network_.

## **2. Team**

- Alberto Rosas
- Alejandro Rosas
- Jiacheng

## **3. Roles**

- **Admin**: Manages tokenized securities listings.
- **User**: Buys and sells tokenized securities.

## **4. User Flows**

### **4.1. Admin Flow**

1. **Authentication**:

   - Login using Didit Unified Access and force change of chain. (Optional: Social Login and safe wallet creation)
   - Exchange Didit access token to internal token via **`/exchangeToken`** endpoint.
   - Backend to verify role as "admin" from the internal token.

2. **Console Access**:

   - Accessible via Menu.
   - Frontend checks internal token for "admin" role to load this page.

3. **Listing Creation**:

   - **`Create Listing`** button opens a popup for listing `**markdown`** and `**image upload**`, setting `**total tokens**`, `**initial sale tokens**`, `**initial liquidity tokens**`, and `**initial token value\*\*`.
   - On submission:
     - Deploys **SECURITY TOKEN CONTRACT** and returns a ******\*\*******\*\*\*\*******\*\*******contract address******\*\*******\*\*\*\*******\*\******* if successful (Manual for the moment)
   - Opens a new tab for the created listing.

4. **Token Management**:

   - Options for **`forceTansfer`**, **`Block`**, **`Unblock`**.
   - Interact with **SECURITY TOKEN CONTRACT**'s functionalities based on selections.

5. **UX Enhancements**:

   - Confirmation notifications for backend or smart contract interactions.

6. **Token Release & Market Creation (Manual for the moment).**
   - `**Unpause**` transfers in smart contract post successful listing.
   - Create a market on Uniswap V2 with initial token liquidity of the total supply.
   - Convert listing status from "Sale" to "Tradeable".

### **4.2. User Flow**

1. **User Onboarding**

- **Login**
  - User logs into the platform using Didit Unified Access.
  - **Optional Enhancement**: Integrate Social Login options and allow the user to create a secure wallet.
- **Identity Verification**
  - Post login, the system checks if the user is verified.
  - If **`isVerified`** == False and **`role`** ≠ **`admin`**, buy/sell buttons are hidden from the user interface.
  - Instead, a "Verify Your Identity" call-to-action is shown, prompting users to complete the verification process.
- **Token Exchange**
  - A seamless token exchange takes place in the background.
  - The system calls the **`/exchangeToken`** endpoint to exchange the Didit token to an internal token, adding attributes like **`sub`**, **`isVerified`**, **`email`**, **`wallet_address`**, and **`role`** to the user's session or profile.

2. **Listing related Pages**

   - **Listing Page**
     - The primary marketplace for users to view and interact with listings.
     - Can be filtered by Status
   - **Listing Detail Page (`listings/{contract_address}`)**
     - Here, users can deep-dive into the specifics of a listing.
     - The system fetches detailed information about the listing via **`/listings/{contract_address}`**.
     - Key Information Displayed:
       - Listing details: Markdown content, images, contract address, total tokens, value per token in USD, and total value.
       - Transaction buttons:
         - **Tradeable Status**: "Buy" and "Sell" buttons, redirect to respective transaction pages or pop-ups. (At the beginning to make it easy we will redirect to something like this: https://app.1inch.io/#/56/simple/swap/0x5b6bf0c7f989de824677cfbd507d9635965e9cd3/USDC)
         - **Sale Status**: Displays the "Buy" button, initial price, purchased tokens count, available tokens, sale completion percentage, and sale end time.
         - **Refund Status**: A "Refund" button for users with a non-zero balance of the token. This button initiates the refund process via the smart contract.
       - **Admin Role Features**: If the user is an admin, they can edit the listing's markdown, images, and change its status. The edit functionality is safeguarded via the **`/listing`** PATCH operation.

3. **User Dashboard:**
   - An overview of the user's activities and balances on the platform.
   - **Token Balances**: By calling **`user/balance/{wallet_address}`**, the system displays the user's token balances for each listing and their USDC token balance.
   - **Transaction History**: Users can view their entire transaction history (sorted by timestamp) through the **`user/transactions/{wallet_address}`** endpoint. Transactions are categorized as "Minting", "Buy", "Sell", with additional details for complex swaps (e.g., a swap from **`listing_token_1`** to **`listing_token_2`** is logged as a "Sell" followed by a "Buy").
   - **Transaction Tools**: Next to each token balance, users see buttons to "Receive" or "Transfer" tokens. Clicking these buttons opens a transaction modal, offering easy-to-use transaction functionalities.

## 5. Smart Contracts

### 5.1. **Common Functions (ERC20 Standards):**

1. **name()**: Returns the name of the token.
2. **symbol()**: Returns the symbol of the token.
3. **decimals()**: Returns the number of decimals for display purposes.
4. **totalSupply()**: Returns the total supply of the token.
5. **balanceOf(address owner)**: Returns the balance of a particular account.
6. **transfer(address to, uint256 value)**: Transfers tokens from the sender's account to 'to' account.
7. **approve(address spender, uint256 value)**: Approves a spender to spend tokens from the sender's account.
8. **transferFrom(address from, address to, uint256 value)**: Transfer tokens from one account to another after approval.
9. **allowance(address owner, address spender)**: Returns the amount a spender is allowed to spend from an owner's account.

### 5.2. **Additional Functions:**

1. **mint(address to, uint256 value)**: Mints new tokens and assigns them to a given account. This simulates the buying mechanism on the sale.
2. **burn(address from, uint256 value)**: Destroys tokens from a given account. Useful for various scenarios including refunds.
3. **pause() & unpause()**: Functions to pause and unpause all token transfers. Typically controlled by the admin.
4. **forceTransfer(address from, address to, uint256 value)**: Allows the admin to forcibly transfer tokens between two accounts, bypassing standard transfer checks.
5. **blockAddress(address target)**: Blocks a specific address from making transactions.
6. **unblockAddress(address target)**: Unblocks a previously blocked address.
7. **saleInfo()**: Fetches information about the ongoing sale such as total tokens, value per token, total value, etc.
8. **refund(address owner)**: Handles the refund mechanism.
9. **isAgent(address owner)**: Checks if a particular address is an Agent.
10. **addAgent(address agent)**: Adds a new Agent.
11. **removeAgent(address agent)**: Removes an existing Agent.

### 5.3. **Event Emitters:**

- **Transfer**: Fired when tokens are transferred.
- **Approval**: Fired when approval is set or modified.
- **Mint**: Logs token minting.
- **Burn**: Logs token burning.
- **Pause**: Logs when transfers are paused.
- **Unpause**: Logs when transfers are unpaused.
- **AddressBlocked**: Logs when an address is blocked.
- **AddressUnblocked**: Logs when an address is unblocked.
- **AgentAdded**: Logs when a new Agent is added.
- **AgentRemoved**: Logs when an Agent is removed.
