interface ListingData {
  zillowHomeDetailsLink: string;
  price: number;
}

// scrape relevant listing data
const zillowHomeDetailsLink = document.URL;
const price = Number(
  document
    .querySelector('[data-testid="price"] > span')
    .textContent.replace(/[$,:]/g, "")
);

const listingData: ListingData = {
  zillowHomeDetailsLink,
  price,
};

const baseUrl = "http://localhost:5173";
const redirectUrl = `${baseUrl}?zillowHomeDetailsLink=${listingData.zillowHomeDetailsLink}&price=${listingData.price}`;

// render a link to redirect to the deal analyzer webpage with the redirect url we have constructed
const extensionLink = document.createElement("a");
const extensionLinkLabel = document.createTextNode("Analyze deal");
extensionLink.appendChild(extensionLinkLabel);
extensionLink.setAttribute("id", "deal_analyzer_trigger");
extensionLink.classList.add('analyze_deal_link')
extensionLink.href = redirectUrl;
extensionLink.target = "_blank";
document.body.appendChild(extensionLink);
