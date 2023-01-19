import React, { useState } from 'react'



function FAQs() {
  const [faqs, setFaqs] = useState<any[]>([
    {
      id: 1,
      question: 'When do I need to book my move?',
      answer: 'Answer goes here...',
      open: false,
    },
    {
      id: 2,
      question: 'When do I pay for my home move?',
      answer: 'Anytime, however, full payment needs to be done before date of the move.',
      open: false,
    },
    {
      id: 3,
      question: 'Who will pack my effects?',
      answer: 'Answer goes here...',
      open: false,
    },
    {
      id: 4,
      question: 'Can I take my car, motorcycle, boat, or trailer with me?',
      answer: 'Answer goes here...',
      open: false,
    },
    {
      id: 5,
      question: 'Can I pack goods for myself?',
      answer: 'Answer here',
      open: false,
    },
    {
      id: 6,
      question: 'Do I need insurance?',
      answer: 'Answer goes here...',
      open: false,
    },
    {
      id: 7,
      question: 'What type of trucks do you use, open or closed?',
      answer: 'Answer goes here...',
      open: false,
    },
    {
      id: 8,
      question: 'Do you have protective gear in your trucks?',
      answer: 'Yes, we provide protective blankets free of charge.',
      open: false,
    },
    {
      id: 9,
      question: 'Do you work on weekends?',
      answer: 'Yes, we do.',
      open: false,
    }
  ]);

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
      <div className="container">
        <h1>Frequently asked questions</h1>

        { faqs.map((faq: any, index: number) => <div id={faq.id} key={faq.id} className="FAQ" onClick={() => showAnswer(faq.id)}>
          <div className='FAQ__question'>
            <div>{ index + 1}. {faq.question}</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', padding: 8, width: 56, height: 56, borderRadius: "50%", backgroundColor: 'var(--color-primary)'}}>
            { !faq.open ? <span className="material-icons" style={{ fontSize: 40, color: 'var(--color-white)' }}>expand_more</span> :
            <span className="material-icons" style={{ fontSize: 40, color: 'var(--color-white)' }}>expand_less</span>}
            </div>
          </div>
          <div className='FAQ__answer' style={{ display: faq.open ? 'block' : 'none'}}>
            { faq.answer }
          </div>
        </div> )}
      </div>
    </div>
  )
}

export default FAQs;
