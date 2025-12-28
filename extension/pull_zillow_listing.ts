interface ListingData {
  zillowHomeDetailsLink: string;
  price: number;
}

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

alert(redirectUrl);
