# Tokenization Platform

## **1. Objective**

To build a platform enabling users to buy and sell tokenized securities.

## **2. Team**

- Alberto
- Alejandro
- Frontend
- Blockchain

## **3. User Roles**

- **Admin**: Manages tokenized securities listings.
- **User**: Buys and sells tokenized securities.
  - **Differentiation**: The **`role`** field in the User table. (i.e., **`role == "admin"`**).

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
     - Deploys **SECURITY TOKEN CONTRACT** and returns a **************\*\*\*\***************contract address**************\*\*\*\*************** if successful
     - POST request to **`/listings` with contract_address**. The backend verifies token validity, the "admin" role, the uniqueness of contract_address, and that this contract responds to the totalSupply call successfully.
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

1. **Listing related Pages**
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
2. **User Dashboard:**
   - An overview of the user's activities and balances on the platform.
   - **Token Balances**: By calling **`user/balance/{wallet_address}`**, the system displays the user's token balances for each listing and their USDC token balance.
   - **Transaction History**: Users can view their entire transaction history (sorted by timestamp) through the **`user/transactions/{wallet_address}`** endpoint. Transactions are categorized as "Minting", "Buy", "Sell", with additional details for complex swaps (e.g., a swap from **`listing_token_1`** to **`listing_token_2`** is logged as a "Sell" followed by a "Buy").
   - **Transaction Tools**: Next to each token balance, users see buttons to "Receive" or "Transfer" tokens. Clicking these buttons opens a transaction modal, offering easy-to-use transaction functionalities.

## 5**. Models**

### 5.1**. User Model**

- **`sub`**: String (Unique user identifier from Didit token)
- **`email`**: String
- **`wallet_address`**: String
- **`role`**: Enum (**`admin`**, **`user`**)
- **`is_verified`**: Boolean
- **`verification_session`**: JSON

### 5.2**. Listing Model**

- **`contract_address`**: String (Unique)
- `**name:**` String
- `**description:**` String
- `**portrait_image:**` String
- **`markdown`**: Text
- **`images`**: Array (of image URLs/paths)
- **`total_tokens`**: Number
- **`initial_sale_tokens`**: Number
- **`initial_value_per_token`**: Number
- `**end_time_sale**`: Number
- **`tokens_sold`**: Number
- **`status`**: Enum (**`Sale`**, **`Tradeable`**, **`Refund`**)

## **6. Backend Endpoints**

---

### 6.1**. Authentication & User Management**

1. **`/users` (CRUD Operations)**
   - **Protection**: Appropriate access controls.
   - **Purpose**: Manage user data.
2. **`/exchange-token` (POST)**
   - **Input**: Didit Access Token
   - **Output**: Internal Token (JWT) with fields: **`sub`**, **`wallet_address`**, **`role`**.
   - **Purpose**: Exchanges Didit access token for an internal platform token. If the **`sub`** from Didit Access Token isn't in the User Database, then initiate **POST** to **`/users`**.
3. **`/verification` (GET)**
   - **Header**: Didit Access Token
   - **Output**: status with `**is_verified**` of the user
4. **`/verification` (POST)**
   - **Header**: Didit Access Token
   - **Logic**: creates a Didit Identity Verification /session if the user is not verified and updates the user **`verification_session_id`**.
   - **Output**: the `**session_token, session_url**`

- **`/verification/decision` (POST)**
  - **Header**: Didit Access Token
  - **Logic**: check the Didit verification /decision, and update the user **`is_verified`** accordingly. If true, modify the Identity-related smart contract associating the wallet_address of the user with is_verified
  - **Output**: status with `**is_verified**` of the user.

---

### 6.2**. Listings Operations**

1. **`/listings` (GET)**
   - **Filters**: Can be refined by contract address and status.
   - **Note**: Additional details TO COMPLETE.
2. **`/listings` (POST)**
   - **Header**: Internal Token, protected by `**role == “admin”**`
   - **Input**:
     - Contract address
     - Listing markdown
     - Images
     - Total tokens
     - Initial sale tokens
     - Initial value per token
     - … and more
   - **Output**: Status and contract address.
   - **Purpose**: Create a new listing linked to a freshly deployed SECURITY TOKEN CONTRACT.
3. **`/listings/{contract_address}` (PATCH)**
   - **Header**: Internal Token, protected by `**role == “admin”**`
   - **Input**:
     - Updated markdown
     - Updated images
     - Updated status
   - **Purpose**: Enables an admin to modify a listing.
4. **`/listings/{contract_address}` (DELETE)**
   - **Header**: Internal Token
   - **Purpose**: Enables an admin to delete a listing.

---

### 6.3**. User Dashboard Operations**

1. **`/user/balance/` (GET)**
   - **Header**: Internal Token, query internal token **`wallet_address`**
   - **Output**: User's token balances for each listing and USDC balance.
   - **Purpose**: Showcase the user's balances on the dashboard.
2. **`/user/transactions/` (GET)**
   - **Header**: Internal Token, query internal token **`wallet_address`**
   - **Output**: Compilation of user transactions.
   - **Purpose**: Display the user's transaction records on the dashboard.

## 7. Frontend

### 7**.1.** Components

1. **Authentication Components**

- **Login Component**: Integrating Didit Unified Access.
- **Token Exchange Component**: A seamless background component that exchanges tokens.
- **Identity Verification Component**: Prompting users to verify their identity. Will create a session, open a new tab, and then get the decision.

1. **Admin Components**

- **Admin Console Menu Component**: Accessible for only admin users.
- **Listing Creation Popup Component**: Including markdown editor, image upload, and necessary fields.
- **Token Management Popup Component**: Options for **`Transfer`**, **`Block`**, **`Unblock`**.
- **Confirmation Toast Component**: For backend or smart contract interactions.

1. **User Components**

- **Trading Listings Component**: Display listings marked as **`Tradeable`**.
- **Sale Listings Component**: Display listings marked for sale.
- **Listing Detail Component**: Detailed information about a specific listing.
- **User Dashboard Component**: Display token balances and transaction history.

1. **Common Components**

- **Header & Footer Component**: For platform-wide uniformity.
- **Notification/Toast Component**: For displaying success or error messages.
- **LoadingSpinner**: For async operations like calling the backend or smart contract.
- **Modal**: For popups like Create Listing, Transfer, Block, Unblock, and Identity Verification.

### 7.2. \***\*Pages:\*\***

- **`/`**: Home Page/Listings Page (default route)
- **`/listing`**: Listings page
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/832caa44-1c27-420a-b4d3-7016225de36a/428fa292-62b1-4321-9b6a-4f1ffca187f6/Untitled.png)
- **`/admin-console`**: Admin Console Page **(protected route)**
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/832caa44-1c27-420a-b4d3-7016225de36a/db842df4-cfa0-49c3-8d3b-bef5e3283aff/Untitled.png)
- **`/listings/{contract_address}`**: Listing Detail Page
  - Missing buttons, and information, but for design perspective is good.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/832caa44-1c27-420a-b4d3-7016225de36a/bba2538a-3b6b-4a38-a380-ac39aa3de0ab/Untitled.png)
- **`/dashboard`**: User Dashboard **(protected route)**
  (just for reference)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/832caa44-1c27-420a-b4d3-7016225de36a/7ebf3151-c794-46b5-98ed-f6667dae2e6a/Untitled.png)

### 7.3 **Shared Contexts:**

- **UserDataContext**: Contains user data, role, verification status, etc.
- **TokenContext**: Handles the exchange and management of tokens.

### 7.4. **Recommendations for Development:**

1. **Dynamic Routing**: Use Next.js dynamic routing for pages like **`/listings/[contract_address]`**. This would make it easy to create a unique page for every listing using its contract address.
2. **Protected Routes**: Use Higher Order Components (HOC) or custom hooks to protect routes based on user roles. For example, an **`AdminGuard`** could protect the admin console and **`AuthGuard`** to ensure users are authenticated.

## 8. Smart Contracts

### 8.1. **Common Functions (ERC20 Standards):**

1. **name()**: Returns the name of the token.
2. **symbol()**: Returns the symbol of the token.
3. **decimals()**: Returns the number of decimals for display purposes.
4. **totalSupply()**: Returns the total supply of the token.
5. **balanceOf(address owner)**: Returns the balance of a particular account.
6. **transfer(address to, uint256 value)**: Transfers tokens from the sender's account to 'to' account.
7. **approve(address spender, uint256 value)**: Approves a spender to spend tokens from the sender's account.
8. **transferFrom(address from, address to, uint256 value)**: Transfer tokens from one account to another after approval.
9. **allowance(address owner, address spender)**: Returns the amount a spender is allowed to spend from an owner's account.

### 8.2. **Additional Functions:**

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

### 8.3. **Event Emitters:**

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
