import { Form, Table } from "react-bootstrap";
import Select from 'react-select';
import useNumberInput from "../../_hooks/useNumberInput";

const AddedServices = () => {
    const { ValueDisplay: BubbleWrapDisplay, Value: BubbleWrapValue } = useNumberInput();
    const { ValueDisplay: LargeBoxesDisplay, Value: LargeBoxesValue } = useNumberInput();
    const { ValueDisplay: MediumBoxesDisplay, Value: MediumBoxesValue } = useNumberInput();
    return <>
        <Table borderless>
            <thead className="moves__step__body__table-head">
                <tr>
                    <th><div className="col-12 center">Item description</div></th>
                    <th className="border-elements"><div className="col-12 center">Select item</div></th>
                    <th> <div className="col-12 center"> Quantity </div></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> <div className="col-12 center"> Bakkie Shuttle</div></td>
                    <td className="border-elements"><div>
                    <Select name="residency_type" onChange={() => true} options={[]} className=''  />
                    </div></td>
                    <td><div>N/A</div></td>
                </tr>
                <tr>
                    <td><div className="col-12 center">Bubble wrap</div></td>
                    <td className="border-elements">
                        <div> <Form.Check
                            inline
                            label="2m x 1m bubble wrap"
                            name="group1"
                            type="checkbox"
                            id="bubbleWrap"
                        /></div>
                    </td>
                    <td><div className="col-12 center">{BubbleWrapDisplay}</div></td>
                </tr>
                <tr>
                    <td> <div className="col-12 center"> Boxes </div></td>
                    <td className="border-elements">
                        <div className="col-12 center">
                            <Form.Check
                                inline
                                label="Large box (3m3)"
                                name="large_box"
                                type="checkbox"
                                id="bubbleWrap"
                            />
                            <Form.Check
                                inline
                                label="Medium box (2m3)"
                                name="medium_box"
                                type="checkbox"
                                id="bubbleWrap"
                            />
                        </div>
                    </td>
                    <td>
                        <div className="col-12 center">
                            {LargeBoxesDisplay}
                            <span className="mb-3">
                            </span>
                            {MediumBoxesDisplay}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td> <div> Move insurance</div></td>
                    <td className="border-elements">
                        <div>
                            <Form.Check
                                inline
                                label="Yes"
                                name="has_move_insurance"
                                type="radio"
                            />
                            <Form.Check
                                inline
                                label="No"
                                name="has_move_insurance"
                                type="radio"
                            />
                        </div>
                    </td>
                    <td><div><Form.Control
                        type="text"
                        placeholder="Move insurance"
                        aria-label="Disabled input example"
                    /></div></td>
                </tr>
            </tbody>
        </Table>
    </>
}

export default AddedServices;
