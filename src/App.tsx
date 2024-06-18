import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import DataTable from 'react-data-table-component';

type Drug = {
  id: number;
  name: string;
  brand: string;
  price: string;
  description: string;
  classification: string;
  url: string;
}

const columns = [
  {
    name: 'name',
    selector: row => row.name,
  },
  {
    name: 'brand',
    selector: row => row.brand,
  },
  {
    name: 'price',
    selector: row => row.price,
  },
  {
    name: 'classification',
    selector: row => row.classification,
  },
  {
    name: 'url',
    selector: row => row.url,
  },
];

function App() {
  const [drugs, setDrugs] = useState([] as Drug[]);
  const [showDrugs, setShowDrugs] = useState([] as Drug[]);

  useEffect(() => {
    async function getDrugs() {
      const drugs = await axios.get(`http://localhost:3000/drugs`);
  
      setDrugs(drugs.data);
      setShowDrugs(drugs.data);
    }

    getDrugs();
  }, []);

  function handleSearch(search: string) {
    const result = drugs.filter((drug) => {
      return drug.name.includes(search) || drug.description.includes(search) || drug.classification.includes(search);
    })

    setShowDrugs(result);
  }

  return (

    <div className='main-container'>
      <div>
        <input className='search-bar' type='text' onChange={(e) => {setTimeout(() => handleSearch(e.target.value), 1000)}}/>
      </div>
      <div className='content-table'>
      <DataTable
        columns={columns}
        data={showDrugs}
        fixedHeader={true}
        style={{
          columnWidth: '150px'
        }}
      />
    </div>
    </div>
  )
}

export default App
