export default class NasaLinks {
    constructor() {
        this._apiBase = 'https://api.nasa.gov/neo/rest/v1/feed';
        this._apikey = 'UdMlApTLhUthkdPgEV5QLXJ5mOsH2ctu7Ysrq9F7'; //'3tMdYN1GtEAqRCfP8yIUP6yCg4gQgw8FtE8iFb01';

        this.getAteroidsLink = this.getAteroidsLink.bind(this);
    }

    getAteroidsLink(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;

        const dateStr = year + '-' + month + '-' + day;

        return `${this._apiBase}?start_date=${dateStr}&end_date=${dateStr}&api_key=${this._apikey}`;
    }
}
