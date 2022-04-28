import React from 'react';
import axios from 'axios';

export default class Gallery extends React.Component<{}, {loading: boolean, imageList: any, query: string}> {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            loading: false,
            imageList: []
        }          
    }

    setStateFn = async () => {
        let apiKey = '636e1481b4f3c446d26b8eb6ebfe7127'
        let query = ''
        let imageList = [];

        let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=dog&per_page=24&format=json&nojsoncallback=1"
        

        const {data} = await axios.get(url)        

        for (let i = 0; i < data.length; i++) {
            this.state.imageList.push(data[i].id);
        }        

        this.setState(current => ({
            ...current,
            loading: false,
            imageList
        }))
    }


    componentDidMount = () => {
        this.setStateFn()
    }

    render() {
        return (
            <>
                <div>
                    <h2>SNAPSHOT</h2>
                    <input></input>
                    <button onClick={this.setStateFn}>click</button>

                </div>

                <div>
                    {this.state.loading ? 
                        <div>
                            <h2>now loading</h2>
                        </div>
                        :
                        <div>
                            <h2>loading completed</h2>
                        </div>
                    }
                </div>
            </>
        )
    } 
}