// DOM element references
        const statusMessage = document.getElementById("statusMessage");
        const cryptoTable = document.getElementById("cryptoTable");
        const cryptoTableBody = document.getElementById("cryptoTableBody");
        const searchInput = document.getElementById("searchInput");
        const prevPageBtn = document.getElementById("prevPageBtn");
        const nextPageBtn = document.getElementById("nextPageBtn");
        const pageInfo = document.getElementById("pageInfo");
        const coinDetailModal = document.getElementById("coinDetailModal");
        const closeModalBtn = document.getElementById("closeModalBtn");
        const modalTitle = document.getElementById("modalTitle");
        const modalBody = document.getElementById("modalBody");

        // Global variables for data and pagination state
        let allCoinsData = [];
        let filteredCoinsData = [];
        let currentPage = 1;
        const perPage = 100; // API fetch limit
        const coinsPerPage = 10; // Items displayed per page

        /**
         * Fetches cryptocurrency data from the CoinGecko API.
         * Fetches a larger dataset (100 coins) for client-side search and pagination.
         */
        async function fetchCryptoData() {
            statusMessage.textContent = "Loading cryptocurrency data...";
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&price_change_percentage=24h,7d&sparkline=true`
                );
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
                allCoinsData = await response.json();
                filteredCoinsData = [...allCoinsData]; // Initialize filtered data with all data
                statusMessage.textContent = ""; // Clear loading message
                renderCurrentPage();
            } catch (error) {
                console.error("Failed to fetch crypto data:", error);
                statusMessage.textContent = "Failed to load data. Please try again later.";
                cryptoTable.classList.add("hidden");
            }
        }

        /**
         * Renders the current page of cryptocurrencies to the table.
         * Slices the filtered data to show only the coins for the current page.
         */
        function renderCurrentPage() {
            const start = (currentPage - 1) * coinsPerPage;
            const end = start + coinsPerPage;
            const coinsToRender = filteredCoinsData.slice(start, end);

            cryptoTableBody.innerHTML = coinsToRender
                .map((coin, index) => {
                    const rank = start + index + 1;
                    const priceChange = coin.price_change_percentage_24h;
                    const priceChangeClass = priceChange >= 0 ? "positive-change" : "negative-change";

                    return `
                        <tr data-coin-id="${coin.id}">
                            <td>${rank}</td>
                            <td>
                                <div class="coin-info">
                                    <img src="${coin.image}" alt="${coin.name} logo" class="coin-logo">
                                    <div class="coin-name-symbol">
                                        <span class="coin-name">${coin.name}</span>
                                        <span class="coin-symbol">${coin.symbol}</span>
                                    </div>
                                </div>
                            </td>
                            <td>$${coin.current_price.toLocaleString()}</td>
                            <td class="${priceChangeClass}">${priceChange.toFixed(2)}%</td>
                            <td>$${coin.market_cap.toLocaleString()}</td>
                        </tr>
                    `;
                })
                .join("");

            // Update pagination buttons and info
            const totalPages = Math.ceil(filteredCoinsData.length / coinsPerPage);
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === totalPages || filteredCoinsData.length === 0;

            // Attach click listeners to table rows for modal
            document.querySelectorAll("#cryptoTableBody tr").forEach(row => {
                row.addEventListener("click", () => {
                    const coinId = row.getAttribute("data-coin-id");
                    const selectedCoin = allCoinsData.find(coin => coin.id === coinId);
                    if (selectedCoin) {
                        showCoinDetails(selectedCoin);
                    }
                });
            });
        }

        /**
         * Filters the crypto data based on the search input and re-renders the table.
         */
        function filterAndRenderTable() {
            const searchTerm = searchInput.value.toLowerCase();
            filteredCoinsData = allCoinsData.filter(
                (coin) =>
                coin.name.toLowerCase().includes(searchTerm) ||
                coin.symbol.toLowerCase().includes(searchTerm)
            );
            currentPage = 1; // Reset to first page after filtering
            renderCurrentPage();
        }

        /**
         * Shows the detailed modal for a specific coin.
         * @param {object} coin - The coin data to display in the modal.
         */
        function showCoinDetails(coin) {
            modalTitle.textContent = coin.name;
            modalBody.innerHTML = `
                <div class="modal-details-header">
                    <img src="${coin.image}" alt="${coin.name} logo" class="coin-logo-modal">
                    <div class="coin-details-text">
                        <h4 class="text-xl font-bold">${coin.name} (${coin.symbol.toUpperCase()})</h4>
                        <span class="text-lg font-semibold text-gray-700">$${coin.current_price.toLocaleString()}</span>
                    </div>
                </div>
                <div class="coin-info-grid">
                    <div class="info-item">
                        <span class="info-label">Market Cap Rank</span>
                        <span class="info-value">#${coin.market_cap_rank}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Market Cap</span>
                        <span class="info-value">$${coin.market_cap.toLocaleString()}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">24h High</span>
                        <span class="info-value">$${coin.high_24h.toLocaleString()}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">24h Low</span>
                        <span class="info-value">$${coin.low_24h.toLocaleString()}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Total Volume</span>
                        <span class="info-value">$${coin.total_volume.toLocaleString()}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Circulating Supply</span>
                        <span class="info-value">${coin.circulating_supply.toLocaleString()}</span>
                    </div>
                </div>
            `;
            coinDetailModal.classList.remove("hidden");
        }

        // Event Listeners
        searchInput.addEventListener("keyup", (e) => {
            filterAndRenderTable();
        });

        prevPageBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderCurrentPage();
            }
        });

        nextPageBtn.addEventListener("click", () => {
            const totalPages = Math.ceil(filteredCoinsData.length / coinsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderCurrentPage();
            }
        });

        closeModalBtn.addEventListener("click", () => {
            coinDetailModal.classList.add("hidden");
        });

        // Also close modal when clicking outside of it
        coinDetailModal.addEventListener("click", (e) => {
            if (e.target === coinDetailModal) {
                coinDetailModal.classList.add("hidden");
            }
        });
        
        // Fetch data when the page loads
        document.addEventListener("DOMContentLoaded", fetchCryptoData);