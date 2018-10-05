class userListing {
    constructor() {
        this.search();
    }
    search() {
        let searchForm = document.getElementById('searchForm');
        
        searchForm.onkeyup = (e) => {
            if (e.keyCode === 13) {
                searchForm.submit();
            }
        }
    }
}
let main = new userListing();