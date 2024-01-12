export function removeUrlFromHistory(url) {
    browser.history.deleteUrl({
        url: url
    });
}