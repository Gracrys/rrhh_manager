import trae from 'trae'


const configService = {
	apiUrl: "10.10.1.120:8081"
}


const rrhh_Service = trae.create({
	baseUrl: configService.apiUrl
})


const rrhhReq = {}

rrhhReq.search = function (q) {
	// const type = 'track'
	return rrhh_Service.get('/search', {
		params: {
			q
		}
	}).then(res => res.data)
}

export default rrhhReq

/*trackService.search(this.searchQuery)
  .then(res => {
    this.tracks = res.tracks.items
})
*/
