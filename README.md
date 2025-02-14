# WebSocket Orderbook

This application connects to the **HollaEx WebSocket API** to display the **BTC/USDT** orderbook in real-time.

## Features

- Live orderbook updates
- Spread calculations
- Depth visualization
- Dark/Light mode
- Responsive design

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:mhmmdglc/hollaEx.git
   cd your-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a **.env** file and add:
   ```env
   NEXT_HOLLAEX_API_KEY=your_api_key
   NEXT_HOLLAEX_API_SECRET=your_api_secret
   ```
4. Start the application:
   ```bash
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Resources

- [HollaEx API](https://docs.hollaex.com)
- [Next.js](https://nextjs.org/docs)

