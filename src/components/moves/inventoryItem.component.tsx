import { Col, Form, Row } from 'react-bootstrap';
import useAPI from 'src/_hooks/useAPI';
import useNumberInput from "../../_hooks/useNumberInput";

type Props = {
    item: any;
}

function InventoryItem({ item }: Props) {
  const api = useAPI();
  const { ValueDisplay: itemCount, Value: itemCountValue } = useNumberInput();

  const handleSelect = async (item: any) => {
    console.log(`Inventory Item`, item.target.id);

    const data = {
      item: item.target.id,
      booking: ''
    }

    const response = await api.post('/inventory', data);
    console.log(response)
  }

  return (
    <Row className='InventoryItem'>
      <Col>
        <Form.Check
          inline
          type='checkbox'
          label={ item.title }
          id={item.id}
          onChange={handleSelect}
        />
      </Col>
      <Col>
        { itemCount }
      </Col>
    </Row>
  )
}

export default InventoryItem;
