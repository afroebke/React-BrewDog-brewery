import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';






class App extends React.Component { 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }


    // ComponentDidMount is used to grab the api json information

    componentDidMount() {
        fetch("https://api.punkapi.com/v2/beers?per_page=80")
            .then((res) => res.json())
            .then((json) => {

	    	//sort the data by decreasing abv and update the state
                this.setState({	
                    items: json.sort((a, b) => (a.abv < b.abv) ? 1 : -1),
                    DataisLoaded: true
                });
            })
    }

    //here we format the user interface layout

    render() {
        const { DataisLoaded, items } = this.state;

        //Basic loading screen

        if (!DataisLoaded) return <div>
            <h1> Please wait a bit longer.... </h1> </div>;

        // After loading data

        return (
                <div className="App">
                <h1> Beers listed at BrewDog brewery web site</h1>
                <h2><font size="1"><mark>(Highlighted Beers are dry hopped)</mark></font></h2>
                    <TableContainer component={Paper}>
                        <Table  size="small" aria-label="Beer Table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Name:</TableCell>
                                <TableCell>Image:</TableCell>
                                <TableCell align="left">TagLine:</TableCell>
                                <TableCell align="left">Description:</TableCell>
                                <TableCell align="right">ABV:</TableCell>
                                <TableCell align="right">IBU:</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>
                            {items.map((row) => (                               
                                <TableRow key={row.id}> 
                                    <TableCell component="th" scope="row">
                                        {/*Here we highlight the name if it contains dry hop, and add a red warning if it contains lactose*/}
                                            {JSON.stringify(row.ingredients.hops).includes("dry hop") ? <mark>{row.name}</mark> : row.name}  <p style={{ color: 'red' }}>{JSON.stringify(row).includes("lactose") ? "Warning: contains lactose" : ""}</p>
                                        </TableCell>
                                        <TableCell align="center"><img width='40%' src={row.image_url} alt='{item.name}' /></TableCell>
                                        <TableCell align="right">{row.tagline}</TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="right">{row.abv}</TableCell>
                                    <TableCell align="right">{row.ibu ? row.ibu : <p style={{ color: 'lightgreen' }}>Undefined in source</p>}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
        );
    }
}
       
export default App;