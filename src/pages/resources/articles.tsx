import { Tab, Tabs } from "react-bootstrap";
import { AiFillFacebook, AiOutlineMail } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { CoverImage } from "../../components/ui";

const Articles = () => {
  return (
    <div className="Resources container-fluid">
      <CoverImage
        size="medium"
        src="/img/services/resources_banner.png"
        pageTitle="Articles"
        description="Take a moment to catch your breath – we all need help"
      />

      <div className="resources__article container mt-5">
        <h2>Articles and tips</h2>
        <div className="row mt-5">
          <div className="col-12">
            <Tabs defaultActiveKey="moving_tips" id="articles" className="mb-3">
              <Tab eventKey="moving_tips" title="Moving Tips">
                <div className="resources__article__social mb-4">
                  <BsTwitter /> <AiFillFacebook className="mx-3" />{" "}
                  <AiOutlineMail />
                </div>
                <div className="resources__article__head">
                  <p>The mayhem of moving</p>
                </div>
                <div className="resources__article__body">
                  <p>
                    Moving is said to be one of the most stressful events of a
                    person’s life. To avoid the pressure that moving places on
                    you, it’s advisable to make use of a professional moving
                    company.
                    <br />
                    <br />
                    The first step is to select a company that belongs to
                    accredited moving associations such as SAIMA, AMOSA and the
                    RFA. The company should be in good standing with the
                    national transport industry regulator. The National
                    Bargaining Council for the Road Freight Industry (NBCRFI) is
                    an organisation that all transport companies must register
                    with.
                    <br />
                    <br />
                    In South Africa, the first and at the end of each month are
                    the times when most people enter into new leases and
                    rentals. This means that from the 25th to the 5th – the
                    moving rush begins! Avoiding this mayhem is easy to do if
                    you book your removal dates well ahead. Don’t put your quote
                    calls off until the last minute! Rather confirm your
                    agreements with a reliable removals contractor at least
                    three weeks before D-day.
                    <br />
                    <br />
                  </p>
                  <p>Getting a quote is simple:</p>
                  <ol>
                    <li>Virtual survey </li>
                    <li>Email list </li>
                    <li>Face-to -face survey </li>
                  </ol>
                  <p>
                    Remember to include the what, where, who, how of your
                    request. Who are you? What are you moving? Where are you
                    moving it from and then to? How will it need packing, or
                    packaging?
                  </p>
                  <p>
                    Don’t drop the ball – confirm all your removal dates and
                    details at least two weeks before. Go a step further and
                    make sure that should someone drop (or break, as it were)
                    the ball, insurance covers it.{" "}
                  </p>
                  <p>
                    Clutter? Clear it out. Those jerseys you haven’t worn in
                    three years? Time to donate them! These are ways in which
                    your move can be blessing not just to you, but others in
                    need.
                  </p>
                  <h6>Five Days to go</h6>
                  <p>Remember:</p>
                  <ol>
                    <li>Confirm your move dates </li>
                    <li>Sign and submit.</li>
                    <li>Insure your goods for transit.</li>
                    <li>
                      If you’re taking care of it yourself – start packing!{" "}
                    </li>
                  </ol>
                  <h6>Three Days to go</h6>
                  <p>
                    Have you informed your packer of what items still need to be
                    packed? Most reputable removal companies handle the packing
                    of small items, breakable belongings, glass tops, TV sets,
                    and fragile belongings such as pictures and lamps.
                  </p>
                  <h6>Pets / Cars</h6>
                  <p>
                    Make sure that these are moved and out of the way on move
                    days – animals are especially at risk of being traumatised.
                    They need to be safely moved out of the way.
                  </p>
                  <h6>
                    Keys / Cell phones / Plane tickets / Firearms / Wallets /
                    Valuables and travel bags / Goods not to be moved
                  </h6>
                  <p>
                    These are precious, so don’t leave them lying around. A
                    simple packing hack is to designate a room and to keep these
                    items separate and safely locked up.
                  </p>

                  <p>
                    Have you paid? Do you have access to the internet for
                    communication and transactions? Then you’re ready to take a
                    quick tour of your place just to be sure you’ve covered
                    everything. This includes your box of this-and-that: items
                    such as TV remotes, bed screws, tools, cleaning materials,
                    packing tape, knife…
                  </p>

                  <p>
                    Moving doesn’t seem so bad now, does it? You can do it!
                    Especially with a cup of coffee and some nibbles to give you
                    that boost on D-day.
                  </p>

                  <p>So then, happy moving. Here’s to your new season!</p>
                  <p>With warm regards from the Joël Transport Team</p>
                </div>
              </Tab>
              <Tab eventKey="home_checklist" title="Home Checklist">
                <div className="resources__article__social mb-5">
                  <BsTwitter /> <AiFillFacebook className="mx-3" />{" "}
                  <AiOutlineMail />
                </div>
                <div className="resources__article__body">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 resources__article__body__list mb-5">
                        <div className="resources__article__head">
                          <p>1. Change of address</p>
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
                          <li>
                            10. Friends and family subscriptions and
                            associations
                          </li>
                        </ul>
                      </div>
                      <div className="col-6 resources__article__body__list mb-5">
                        <div className="resources__article__head">
                          <p>2. Services to cancel/transfer</p>
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
                          <p>3. Packing & storage</p>
                        </div>
                        <ul>
                          <li>1. Purge unused items</li>
                          <li>2. Reserve truck or movers</li>
                          <li>3. Pack infrequently used items ahead of time</li>
                          <li>
                            4. Family “move kit” for first night in new home
                          </li>
                        </ul>
                      </div>
                      <div className="col-6 resources__article__body__list mb-5">
                        <div className="resources__article__head">
                          <p>4. Organise</p>
                        </div>
                        <ul>
                          <li>
                            1. Keep personal and finance documents in one box.
                          </li>
                          <li>2. Update medical records</li>
                          <li>
                            3. Notify old / new schools and arrange transfer
                          </li>
                          <li>
                            4. Keep keys, garage openers in a bag for new owners
                          </li>
                          <li>
                            5. Keep a folder with warranties / manuals for new
                            owners
                          </li>
                          <li>
                            6. Plan meals to use with the consumables you have
                            left
                          </li>
                          <li>
                            7. Keep receipts of transactions made for moving
                            expenses{" "}
                          </li>
                        </ul>
                      </div>
                      <div className="col-6 resources__article__body__list mb-5">
                        <div className="resources__article__head">
                          <p>5. Moving day</p>
                        </div>
                        <ul>
                          <li>1. Arrange help for kids or pets for the day</li>
                          <li>2. Have cash to tip movers</li>
                          <li>3. Finalise cleaning and dispose of trash</li>
                          <li>4. Final walk through</li>
                          <li>
                            5. Turn off all electric appliances and geysers
                          </li>
                          <li>6. Close and lock all doors and windows</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="office_checklist" title="Office Checklist">
                <div className="resources__article__social mb-5">
                  <BsTwitter /> <AiFillFacebook className="mx-3" />{" "}
                  <AiOutlineMail />
                </div>
                <h6>Removal company</h6>
                <p>
                  Make sure you have a consultant coming a month before D-day.
                  They’ll asses your requirements, so keep this on hand:
                </p>

                <ol>
                  <li>
                    Access at both premises for large vehicles. How many floors/
                    sections are being moved?
                  </li>
                  <li>
                    The timeframe and duration that your company has available
                    for the relocation. The packing and removal dates that you
                    have in mind.
                  </li>
                  <li>Access to lifts/ staircases.</li>
                  <li>Packing and wrapping requirements.</li>
                  <li>
                    Any abnormal items to be transported (safes, zipper
                    cabinets, boardroom tables, reception counters).
                  </li>
                  <li>Dismantling and reassembly requirements.</li>
                  <li>
                    A clear list of items not being moved (such as rented
                    printers, pot plants, drinking fountains, or servers should
                    your IT department be moving them separately).
                  </li>
                  <li>
                    Building-specific health and safety requirements (such as
                    PPE or other safety items). Your consultant will have a
                    wealth of experience which they will share with you to
                    ensure that the timeline and planning for the removal is
                    realistic and efficient!
                  </li>
                </ol>
                <h6>Change of address and service notification</h6>
                <ol>
                  <li>Transfer phone lines</li>
                  <li>Transfer post box numbers</li>
                  <li>Inform SARS</li>
                  <li>Inform local post office</li>
                  <li>Inform rates office</li>
                  <li>Inform customers</li>
                  <li>Inform associated partners</li>
                  <li>Plan signage removal</li>
                  <li>Equipment on loan/ lease</li>
                  <li>Photocopy machines</li>
                  <li>Fire hydrant contracts</li>
                  <li>Vending/ hydration machines</li>
                  <li>Cleaning services</li>
                  <li>Magazine and newspaper deliveries</li>
                  <li>Security companies</li>
                  <li>Access control</li>
                  <li>Pot plant maintenance</li>
                </ol>

                <h6>Internal office moving strategies</h6>
                <p>
                  While your consultant will assist you in ironing out a lot of
                  the folds around the process of office removals, we have
                  provided you with a couple of strategies and ideas that you
                  can follow to make the process easier:
                </p>
                <ol>
                  <li>Have floor plans of both sites readily available.</li>
                  <li>
                    Colour coding is a lifesaver. Don’t knock it till you’ve
                    tried it – it makes it easier to distinguish between
                    departments and floors. By marking items to correspond with
                    the clearly marked rooms at the new premises, you will save
                    a lot of time and effort during the relocation.
                  </li>
                  <li>
                    Designate a “lost and found” section at the new premises for
                    any items that may arrive unmarked.
                  </li>
                  <li>
                    Provide staff with a box allowance and ensure that they are
                    packed up well in advance. Ensure that you leave enough
                    “down time” for dismantling and reassembly upon arrival at
                    the new premises.
                  </li>
                  <li>
                    Should you have unused documents, consider offsite storage,
                    and ask your removal company to assist.
                  </li>
                  <li>Pre-order packing material.</li>
                  <li>
                    Have your removal consultant provide you with packing tips
                    for your employees. This will ensure that boxes are packed
                    and labelled correctly. Upon arrival at the new premises,
                    your consultant will be available to help with any technical
                    support.
                  </li>
                  <li>
                    Ask the removal company to include an after service remedial
                    team in their quotation. This will allow you to have help in
                    moving around any items that may not fit into the new spot
                    as planned after the relocation has taken place.
                  </li>
                </ol>
                <p>
                  Lastly; communicate, communicate, communicate. It’s no use
                  getting frustrated if you haven’t made your needs known!
                  Creating an effective strategy will ensure a removal that’s as
                  seamless as possible.
                </p>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
