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

// render a button to redirect to the deal analyzer webpage with the redirect url we have constructed
// TODO - figure out ts issue so that you can render a react component instead
const extensionBtn = document.createElement("button");
const extensionBtnLabel = document.createTextNode("Analyze deal");
extensionBtn.appendChild(extensionBtnLabel);
extensionBtn.setAttribute("id", "deal_analyzer_trigger");
extensionBtn.style.position = "fixed";
extensionBtn.style.right = "50px";
extensionBtn.style.top = "50px";
extensionBtn.style.zIndex = "999999999";
extensionBtn.onclick = () => window.open(redirectUrl, "_blank");
document.body.appendChild(extensionBtn);
