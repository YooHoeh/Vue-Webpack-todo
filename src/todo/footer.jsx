import '../asset/styles/footer.styl'

export default {
    data() {
        return {
            author: 'YooHoeh',
        }
    },
    render() {
        return (
            <div id="footer">
                <hr />
                <span>Power by {this.author}</span>
            </div>
        )
    }
}