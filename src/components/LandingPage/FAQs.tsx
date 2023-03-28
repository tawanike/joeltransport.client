import React, { useState, useEffect } from 'react'
import useAPI from '../../_hooks/useAPI';


function FAQs() {
    const api = useAPI()
    const [faqs, setFaqs] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const response = await api.get('/faqs', false);
            setFaqs(response.results)
        })();
    }, []);

    const showAnswer = (id: number) => {
        const updatedFAQs: any[] = faqs.filter(answer => {
            if (answer.id === id) {
                answer.open = true;
            } else {
                answer.open = false;
            }
            return answer;
        });
        setFaqs(updatedFAQs);
    }

    return (
        <div className="FAQs">
            {faqs && faqs.length > 0 && <div className="container">
                <h1>Frequently asked questions</h1>

                {faqs.map((faq: any, index: number) => <div id={faq.id} key={faq.id} className="FAQ" onClick={() => showAnswer(faq.id)}>
                    <div className='FAQ__question'>
                        <div>{index + 1}. {faq.title}</div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', padding: 8, width: 56, height: 56, borderRadius: "50%", backgroundColor: 'var(--color-primary)' }}>
                            {!faq.open ? <span className="material-icons" style={{ fontSize: 40, color: 'var(--color-white)' }}>expand_more</span> :
                                <span className="material-icons" style={{ fontSize: 40, color: 'var(--color-white)' }}>expand_less</span>}
                        </div>
                    </div>
                    <div className='FAQ__answer' style={{ display: faq.open ? 'block' : 'none' }}>
                        {faq.description}
                    </div>
                </div>)}
            </div>}
        </div>
    )
}

export default FAQs;
