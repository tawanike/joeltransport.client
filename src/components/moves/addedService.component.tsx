import { FC, useContext, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
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
    console.log("added service", products);
    useEffect(() => {
        dispatchMove({
            type: ADJUST_ADDITIONAL_SERVICES,
            payload: {
                bubbleWrap: {
                    quantity: BubbleWrapValue,
                    price: products.find(product => product.title === "Bubble Wrap")?.price
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
                    price: products.find(product => product.title === "Box (Small)")?.price
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
                    price: products.find(product => product.title === "Box (Medium)")?.price
                }
            }
        })
    }, [MediumBoxesValue])

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
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
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
