import { Tab, Tabs } from 'react-bootstrap';
import { BsTwitter } from 'react-icons/bs';
import { AiFillFacebook, AiOutlineMail } from 'react-icons/ai';
import { CoverImage } from '../../components/ui';

const Articles = () => {
    return (
        <div className="Resources container-fluid">
            <CoverImage
                size="medium"
                src="/img/services/resources_banner.png"
                pageTitle='Articles'
                description='Download documents and or view our certifications'
            />

            <div className="resources__article container mt-5">
                <h2>Articles & Tips</h2>
                <div className="row mt-5">
                    <div className="col-12">
                        <Tabs
                            defaultActiveKey="moving_tips"
                            id="articles"
                            className="mb-3"
                        >
                            <Tab eventKey="moving_tips" title="Moving Tips">
                                <div className="resources__article__social mb-4">
                                    <BsTwitter /> <AiFillFacebook className='mx-3' /> <AiOutlineMail />
                                </div>
                                <div className="resources__article__head">
                                    <p>
                                        Moving home is said to be one of the most stressful times in ones life.
                                    </p>
                                </div>
                                <div className="resources__article__body">
                                    <p>
                                        Moving home is said to be one of the most stressful times in ones life, so it is with good reason that you are strongly advised to make use of a professional moving company with a proven track record.
                                        <br /><br />
                                        Select a company that belongs to accredited moving associations, such as SAIMA, AMOSA the RFA and one that is in good standing with the national transport industry regulator. The National bargaining Council for the Road Freight Industry – NBCRFI – It is requirement for all transport companies to be registered with the NBCRFI.
                                        <br /><br />
                                        Notify a Joel Transport consultant if you add or subtract items from your shipment, or if there is any change in the date of the move or the destination
                                        In South Africa, most lease and rental agreements start on the 1st of each month and end of the month this creates a high demand for removal services from the 25th till the 5th of each month – Be aware of this high demand period and book your removal dates timeously.
                                        Call for quotations at least 3 weeks before your removal date -this will give you sufficient time to select a reliable removals contractor and to book your removal dates. There are 3 simple ways to obtain a quotation * By virtual survey * By e mail list * By face to face survey —— your removal company will need to know what items of furniture you need to move, they will want to know what items require packing and they will need to assess the access at origin and destination addresses.
                                        Book your removal dates at least 2 weeks before your removal date — do this in writing ! accept the quotation and get written confirmation that your removal team has been booked
                                        <br /><br />
                                        Moving home is a high risk time and it is strongly recommended that you insure all goods to be moved or stored. – Do this through your own insurer or ask your Removals consultant to assist you in this regard.​​Do clear out your home and dispose of any unwanted items – dump / sell or donate unwanted items – there are many welfare organisations that will gladly accept donated items.
                                        <br /><br />
                                        5 Days to goDouble check the following ** That your move dates are booked ** That you have signed and submitted your acceptance forms. Be comfortable that you have insured your goods during transit. If you are attending to your own packing you need to be well on your way to having packed everything.
                                        <br /><br />
                                        3 Days to goAdvise your mover what Items still need to be packed – Most reputable removal companies are easily able to assist you with packing of smalls / breakables / glass tops / TV sets and fragiles like pictures and lamps.
                                        <br /><br />
                                        Pets / CarsMake sure that these are moved and out of the way on move days – animals are especially at risk of being traumatised and they need to be safely kenneled or out of the way.
                                        <br /><br />
                                        Keys / Cell phones / Plane tickets / Firearms / Wallets / Valuables and travel bags / Goods not to be moved – Make sure that these are kept safe and are not left lying around – It is a good Idea to designate a room and to keep these items separate and safely locked up.
                                    </p>
                                </div>
                            </Tab>
                            <Tab eventKey="home_checklist" title="Home Checklist">
                                <div className="resources__article__social mb-5">
                                    <BsTwitter /> <AiFillFacebook className='mx-3' /> <AiOutlineMail />
                                </div>
                                <div className="resources__article__body">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6 resources__article__body__list mb-5">
                                                <div className="resources__article__head">
                                                    <p>
                                                        1. Change of address
                                                    </p>
                                                </div>
                                                <ul>
                                                    <li>1. Postal service and SARS</li>
                                                    <li>2. Driver’s license and ID book</li>
                                                    <li>3. Voter registration</li>
                                                    <li>4. Banks and loans</li>
                                                    <li>5. Investments and credit cards</li>
                                                    <li>6. Store credit cards and PayPal</li>
                                                    <li>7. Automated payments</li>
                                                    <li>8. Place of employment</li>
                                                    <li>9. Insurance, doctors, and schools</li>
                                                    <li>10. Friends and family subscriptions and associations</li>
                                                </ul>
                                            </div>
                                            <div className="col-6 resources__article__body__list mb-5">
                                                <div className="resources__article__head">
                                                    <p>
                                                        2. Services to cancel/transfer
                                                    </p>
                                                </div>
                                                <ul>
                                                    <li>1. DSTV / SABC</li>
                                                    <li>2. Internet and telephone</li>
                                                    <li>3. Water and electricity</li>
                                                    <li>4. Trash collection and garden service</li>
                                                    <li>5. Cleaning service and security response</li>
                                                </ul>
                                            </div>
                                            <div className="col-6 resources__article__body__list mb-5">
                                                <div className="resources__article__head">
                                                    <p>
                                                        3. Packing & storage
                                                    </p>
                                                </div>
                                                <ul>
                                                    <li>1. Purge unused items</li>
                                                    <li>2. Reserve truck or movers</li>
                                                    <li>3. Pack infrequently used items ahead of time</li>
                                                    <li>4. Family “move kit” for first night in new home</li>
                                                </ul>
                                            </div>
                                            <div className="col-6 resources__article__body__list mb-5">
                                                <div className="resources__article__head">
                                                    <p>
                                                        4. Organise
                                                    </p>
                                                </div>
                                                <ul>
                                                    <li>1. Keep personal and finance documents in one box.</li>
                                                    <li>2. Update medical records</li>
                                                    <li>3. Notify old / new schools and arrange transfer</li>
                                                    <li>4. Keep keys, garage openers in a bag for new owners</li>
                                                    <li>5. Keep a folder with warranties / manuals for new owners</li>
                                                    <li>6. Plan meals to use with the consumables you have left</li>
                                                    <li>7. Keep moving receipts</li>
                                                </ul>
                                            </div>
                                            <div className="col-6 resources__article__body__list mb-5">
                                                <div className="resources__article__head">
                                                    <p>
                                                        5. Moving day
                                                    </p>
                                                </div>
                                                <ul>
                                                    <li>1. Arrange help for kids or pets for the day</li>
                                                    <li>2. Have cash to tip movers</li>
                                                    <li>3. Final cleaning. Dispose of trash</li>
                                                    <li>4. Final walk through</li>
                                                    <li>5. Turn off all electric appliances and geysers</li>
                                                    <li>6. Close and lock all doors and windows</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="office_checklist" title="Office Checklist">
                                <div className="resources__article__social mb-5">
                                    <BsTwitter /> <AiFillFacebook className='mx-3' /> <AiOutlineMail />
                                </div>
                                Office Checklist
                            </Tab>
                        </Tabs>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Articles;
