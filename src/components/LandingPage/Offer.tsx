import { default as Card } from './ServiceCard';

const services = [
  {
    id: '1',
    title: 'Service 1',
    description: 'This is a description',
    link: 'https://www.ibm.com',
    image: '',
    bgColor: '#1d3a7a'
  },
  {
    id: '2',
    title: 'Service 2',
    description: 'This is a description',
    link: 'https://www.ibm.com',
    image: '',
    bgColor: '#ff3333'
  },
  {
    id: '3',
    title: 'Service 3',
    description: 'This is a description',
    link: 'https://www.ibm.com',
    image: '',
    bgColor: '#191632'
  },
  {
    id: '4',
    title: 'Service 2',
    description: 'This is a description',
    link: 'https://www.ibm.com',
    image: '',
    bgColor: '#da3832'
  },
  {
    id: '5',
    title: 'Service 3',
    description: 'This is a description',
    link: 'https://www.ibm.com',
    image: '',
    bgColor: '#3157aa'
  },
  {
    id: '6',
    title: 'Service 3',
    description: 'This is a description',
    link: 'https://www.ibm.com',
    image: '',
    bgColor: '#da3832'
  }
]



function Offer() {
  return (
    <div className="Offer">
      <h1>What we offer</h1>
      <div className="Offer__usp">
        <p>You can store your goods in our storage, and order them to be shipped at separate times to your desired location</p>
      </div>
      <div className="container">
        <div className="row">
          { services.map((service) =><Card key={service.id} {...service} />) }
        </div>
      </div>
    </div>
  )
}

export default Offer;
