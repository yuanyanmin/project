import '../asset/styles/footer.styl'
export default {
    data(){
        return{
            author:'YYM'
        }
    },
    render() {
        return(
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}