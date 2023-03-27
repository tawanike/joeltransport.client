/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import { CoverImage } from '../../components/ui';

export default function About() {
    return (
        <div className='About'>
            <CoverImage size="medium" src="/img/kaleb.png" pageTitle={`About us`} description={`Meet the experts in moving and storage`} variant="--domestic" />
            <div className="About__our-story container">
                <div className="row">
                    <div className="About__our-story--text col-12 col-md-7 p-4">
                        <h3>Our story</h3>
                        <p>
                            Joël Transport has been around since 1965. We’re a household name with hundreds of satisfied customers.
                        </p>
                        <p>We are based in Centurion, Gauteng; and service domestic relocations in the northern, central, western, and eastern areas of South Africa. We are experts in the furniture and storage industry; and have looked after the moving and relocation needs of singles, couples, families, ambassadors, diplomats, managing directors and transferees. Joël Transport has also handled large office relocations that have lasted weeks for some of the country’s finest institutions.
                        </p>

                        <p>We have built the capacity to enable customer airfreight or sea shipments from South Africa to any destination in the world – and vice versa! Domestic or international removal, and imports and exports are a breeze for us.
                        </p>

                        <p>Joël Transport is a modern South African company, and we are proud to have a 70% PDI rate with regards to management and ownership.</p>
                        <p>We are purpose driven; participating in initiatives that alleviate societal challenges. This includes offering FREE removal within Gauteng (as part of a home move) of gently used furniture, appliances, clothing and linen, etc. These are in turn donated to communities in need through the Lions International organisation.</p>
                    </div>

                    <div className="About__our-story--image col-12 col-md-5">
                        <img src="/img/truck.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="About__leadership container">
                <div className="row">
                    <div className="col-12 About__leadership__head mb-5">
                        <h2>Meet the leadership team</h2>
                        <p>
                            A team that leads by serving.
                        </p>
                    </div>
                    <div className="About__leadership--bio col-12 mb-5">
                        <div className="row">
                            <div className="col-3">
                                <div className="About__leadership--image p-3">
                                    <img src="/img/daniel.png" alt="" />
                                </div>
                            </div>
                            <div className="About__leadership--about col-9">
                                <h4 className='mt-5 mb-3'>Daniel Ngobozana</h4>
                                <p>Daniel Ngobozana is Managing Director and has over 15 years' experience in the relocation sector. He started his career as a packer, and worked his way up the corporate ladder. He is passionate about our customers and is a master at solving the challenges that come with our industry. He is often referred to as, "Mr. Go Extra Mile"!
                                    <br /> He is also a passionate Mamelodi Sundowners supporter.</p>
                            </div>
                        </div>
                    </div>

                    <div className="About__leadership--bio col-12 mb-5">
                        <div className="row">
                            <div className="col-3">
                                <div className="About__leadership--image p-3">
                                    <img src="/img/services/sphiwe.png" alt="" />
                                </div>
                            </div>
                            <div className="About__leadership--about col-9">
                                <h4 className='mt-5 mb-3'>Sphiwe Ngobozana</h4>
                                <p>Sphiwe Ngobozana is Director of Operations with over 15 years' experience in the relocation sector. Like his brother Daniel, he began his career as a packer and worked his way up the corporate ladder.  Sphiwe is passionate about customer satisfaction, and he is someone our team knows they can count on! Unlike his brother, however, Sphiwe is a passionate supporter of Orlando Pirates – something which makes for interesting debates on Monday mornings!</p>
                            </div>
                        </div>
                    </div>

                    <div className="About__leadership--bio col-12 mb-5">
                        <div className="row">
                            <div className="col-3">
                                <div className="About__leadership--image p-3">
                                    <img src="/img/services/peter.png" alt="" />
                                </div>
                            </div>
                            <div className="About__leadership--about col-9">
                                <h4 className='mt-5 mb-3'>Peter Brauteseth</h4>
                                <p>Peter Brauteseth is Business Development Advisor and a former GM at Pickfords Removals. He has over 40 years of experience in the relocation sector. Peter always goes out of his way to get close to our customers to find out what their needs are, and to make their lives better through our services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="About__team container">
                <div className="row">
                    <div className="About__team--image col-12">
                        <div className="row">

                            <img src="/img/team.png" alt="" />
                        </div>
                    </div>
                    {/* <div className="About__team--text col-12">
                        <p>We are purpose driven, participating in initiatives that alleviate societal challenges,
                            including through Lions International. As part of a home move, we offer FREE removal
                            within Gauteng, of unused, but usable customer Furniture, Appliances, Clothing & Linen
                            that are in turn donated to communities in need through Lions International</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
