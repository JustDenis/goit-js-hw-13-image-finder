const ApiKey = '11268845-1c4357a74a39c17587b597947';



export default {
    userQuery: '',
    page: 1,
    fetchImages(){
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.userQuery}&page=${this.page}&per_page=12&key=${ApiKey}`;
        return fetch(url).then(res => res.json());
    },
    incrementPage(){
        this.page += 1;
    },
    resetPage(){
        this.page = 1;
    }
}