interface ListingData {
  zillowHomeDetailsLink: string;
  price: number;
  address: string;
  numBeds: number;
  numBaths: number;
  squareFootage: number;
  rentZestimate: number;
}

// scrape relevant listing data
const zillowHomeDetailsLink = document.URL;
const price = Number(
  document
    .querySelector('[data-testid="price"] > span')
    .textContent.replace(/[$,:]/g, "")
);
const address = document.querySelector(
  '[class^="styles__AddressWrapper"] > h1'
).textContent;
const numBeds = Number(
  document
    .querySelector('[data-testid="bed-bath-sqft-facts"] :nth-child(1)')
    .textContent.replace(/[a-zA-Z,]/g, "")
);
const numBaths = Number(
  document
    .querySelector('[data-testid="bed-bath-sqft-facts"] button')
    .textContent.replace(/[a-zA-Z,]/g, "")
);
const squareFootage = Number(
  document
    .querySelector('[data-testid="bed-bath-sqft-facts"] :nth-child(3)')
    .textContent.replace(/[a-zA-Z,]/g, "")
);
const rentZestimate = Number(document.querySelector('[data-testid="rent-zestimate"]').textContent.replace(/[a-zA-Z,$/]/g, ""))

const listingData: ListingData = {
  zillowHomeDetailsLink,
  price,
  address,
  numBeds,
  numBaths,
  squareFootage,
  rentZestimate
};

const baseUrl = "http://localhost:5173";
const redirectUrl = `${baseUrl}?zillowHomeDetailsLink=${listingData.zillowHomeDetailsLink}&price=${listingData.price}&address=${listingData.address}&numBeds=${listingData.numBeds}&numBaths=${listingData.numBaths}&squareFootage=${listingData.squareFootage}&rentZestimate=${listingData.rentZestimate}`;

// render a link to redirect to the deal analyzer webpage with the redirect url we have constructed
const extensionLink = document.createElement("a");
const extensionLinkLabel = document.createTextNode("Analyze deal");
extensionLink.appendChild(extensionLinkLabel);
extensionLink.setAttribute("id", "deal_analyzer_trigger");
extensionLink.classList.add("analyze_deal_link");
extensionLink.href = redirectUrl;
extensionLink.target = "_blank";
document.body.appendChild(extensionLink);
