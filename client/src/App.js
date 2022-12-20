import { useEffect, useState } from "react"

function ApplianceList() {
  const [appliances, setAppliances] = useState([]);
  const listItems = appliances.map((appliance) =>
    <tr key={appliance.id}>
      <td>{appliance.name}</td><td>{appliance.type}</td><td>{new Date(appliance.createdAt).toLocaleString('en-GB', {timeZone: 'UTC'})}</td>
    </tr>
  );

  useEffect(() => {
    fetch('http://localhost:3000/appliances')
    .then((response) => response.json())
    .then((data) => setAppliances(data.sort(compareApplianceCreatedAt)));
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Type</th><th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {listItems}
      </tbody>
    </table>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Appliances</h1>
      <ApplianceList></ApplianceList>
    </div>
  )
}

function compareApplianceCreatedAt(a, b) {
  const aTimeString = Date.parse(a.createdAt);
  const bTimeString = Date.parse(b.createdAt);

  if (aTimeString > bTimeString) {
    return -1;
  }
  
  if (aTimeString < bTimeString) {
    return 1;
  }

  return 0;
}

export default App

