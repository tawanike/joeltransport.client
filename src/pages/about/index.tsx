/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import { CoverImage } from '../../components/ui';

export default function About() {
    return (
        <div className='About'>
            <CoverImage size="medium" src="/img/kaleb.png" pageTitle={``} description={``} />
            <div className="About__our-story container">
                <div className="row">
                    <div className="About__our-story--text col-12 col-md-7 p-4">
                        <h3>Our story</h3>
                        <p>Joel Transport was established in 1965 and has been a household name synonymous with
                            excellent service in the furniture removals & storage industry since its inception.
                        </p>
                        <p>We are based in Centurion, Gauteng, and service domestic relocations in the northern,
                            central, western, eastern areas of South Africa. Joel Transport has looked after the
                            moving and relocation needs of singles, families, ambassadors and diplomats, managing
                            directors and transferees. Joel Transport has also handled large office relocations that
                            have lasted weeks, for some of the {`country's`} finest institutions.
                        </p>

                        <p>We have built the capacity to attend to customer airfreight or sea shipments FROM/TO
                            South Africa (i.e., imports or exports) and any destination in the world! Any domestic
                            or international removal is a breeze for us.
                        </p>

                        <p>Joel Transport is a new-age South African company that boasts a 70% PDI in management and ownership.</p>
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
                            We are offering a leadership for our team, and we are responsible for the purpose of
                            our team.
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
                                <p>Daniel Ngobozana is our Managing Director and has over 15 years' experience in the
                                    relocation sector. He is a passionate Mamelodi Sundowners supporter. He started his
                                    career as a Packer and worked his way up the corporate ladder. He is passionate about
                                    our customers, and he is always available to solve any customer problem escalated to him.
                                    He is often referred to as, "Mr Go Extra Mile" due to his always-ready-to-help attitude.</p>
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
                                <p>Sphiwe Ngobozana is our Director of Operations and has over 15 years' experience in the
                                    relocation sector. Like his brother Daniel, our MD, he started his career as a Packer and
                                    worked his way up the corporate ladder. Unlike his brother, Sphiwe is a passionate supporter
                                    of Orlando Pirates, which sparks interesting debates on Monday mornings. Sphiwe walks the
                                    talk – our team sees him as someone they can count on. He is passionate about our customer’s
                                    satisfaction.</p>
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
                                <p>Peter Brauteseth is our Business Development Advisor and former GM at Pickfords Removals.
                                    He has over 40 years of experience in the relocation sector. Peter always goes out of
                                    his way to get close to our customers, to find out what their needs are, and how we can
                                    make their lives better with our services. He believes in his team capability in
                                    everything that they do, especially delivering the best customer experience every day</p>
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
                    <div className="About__team--text col-12">
                        <p>We are purpose driven, participating in initiatives that alleviate societal challenges,
                            including through Lions International. As part of a home move, we offer FREE removal
                            within Gauteng, of unused, but usable customer Furniture, Appliances, Clothing & Linen
                            that are in turn donated to communities in need through Lions International</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
