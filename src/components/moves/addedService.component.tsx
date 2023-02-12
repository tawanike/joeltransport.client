import { FC, useContext, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import Select from 'react-select';
import { addBakkieShuttle } from "src/_actions/added-services.actions";
import MoveStateContext from "../../_contexts/move.context";
import useNumberInput from "../../_hooks/useNumberInput";
import { ADJUST_ADDITIONAL_SERVICES, IProduct } from "../../_models/types";

interface IProps {
    products: IProduct[];
}
const AddedServices: FC<IProps> = ({ products }) => {
    const { ValueDisplay: BubbleWrapDisplay, Value: BubbleWrapValue } = useNumberInput();
    const { ValueDisplay: LargeBoxesDisplay, Value: LargeBoxesValue } = useNumberInput();
    const { ValueDisplay: MediumBoxesDisplay, Value: MediumBoxesValue } = useNumberInput();
    const { MoveState, dispatchMove } = useContext(MoveStateContext)

    useEffect(() => {
        dispatchMove({
            type: ADJUST_ADDITIONAL_SERVICES,
            payload: {
                bubbleWrap: {
                    quantity: BubbleWrapValue,
                    price: products.find(product => product.subtitle === "bubble-wrap")?.price
                }
            }
        })
    }, [BubbleWrapValue])

    useEffect(() => {
        dispatchMove({
            type: ADJUST_ADDITIONAL_SERVICES,
            payload: {
                largeBox: {
                    quantity: LargeBoxesValue,
                    price: products.find(product => product.subtitle === "box-large")?.price
                }
            }
        })
    }, [LargeBoxesValue])

    useEffect(() => {
        dispatchMove({
            type: ADJUST_ADDITIONAL_SERVICES,
            payload: {
                mediumBox: {
                    quantity: MediumBoxesValue,
                    price: products.find(product => product.subtitle === "box-medium")?.price
                }
            }
        })
    }, [MediumBoxesValue]);


    const selectBakkieShuttle = (selected: any) => {
        const price = products.find(product => product.subtitle === "bakkie-shuttle")?.price || 0;
        dispatchMove(addBakkieShuttle({
                    quantity: selected.value === 2 ? 2 : 1,
                    price: price
                }));
    }


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
                    <td className="border-elements">
                        <div>
                            <Select name="residency_type" onChange={selectBakkieShuttle} options={[
                                { value: 0, label: 'Loading Address' },
                                { value: 1, label: 'Delivery Address' },
                                { value: 2, label: 'Both Addresses' },
                            ]} className=''  />
                        </div>
                    </td>
                    <td><div>N/A</div></td>
                </tr>
                {<tr>
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
                </tr> }
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
