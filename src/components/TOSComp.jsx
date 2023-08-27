import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import { useEffect } from 'react'

function TOSComp() {
  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top when route changes
  }, [])

  return (
    <>
      <header className='py-4 shadow-sm bg-white'>
        <div className='container flex flex-col items-center justify-center md:flex-row'>
          <div className='flex items-center gap-5'>
            <div>
              <Link to={'/'}>
                <div className='flex gap-2 items-center'>
                  <img src={Logo} alt='Logo' className='w-16' />
                  <h1 className='font-merr font-bold text-3xl'>
                    TNZ Creations
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className='flex flex-col p-5'>
        <h2 className='text-center text-2xl font-medium pb-5'>
          Terms of Service
        </h2>

        <div className='paras flex flex-col gap-7'>
          <div className='para1'>
            <p>
              These Terms of Use (hereinafter referred to as “Terms”) constitute
              a binding agreement between TNZ Creations including any affiliate
              of Mensa Brand TNZ Creations and/or any group company of TNZ
              Creations (hereinafter individually and collectively referred to
              as “Company”) and the person accessing the website [
              <Link to={'/'} className='text-blue-600'>
                https://www.tnzcreations.com/
              </Link>
              ] (hereinafter referred to as "Website") for any purpose,
              including for accessing information, conducting transactions,
              purchasing products or making use of any services or functionality
              provided on or through the Website ("Services"). The Company is
              headquartered at New Delhi. For the purposes of these Terms, the
              terms “we”, “us”, or “our” are references to Company, and the
              terms “you” or “your” are references to the person accessing the
              Website or Services.
            </p>
          </div>

          <div className='para2'>
            <p>
              These Terms shall be read in conjunction with the Privacy Policy
              available at <span> </span>
              <Link to='/privacy-policy' className='text-blue-600'>
                https://www.tnzcreations.com/policies/privacy-policy
              </Link>
              <span> </span>
              By accessing and using the Website and Services your acceptance of
              these Terms and the Privacy Policy is presumed unless communicated
              otherwise. You represent that you are above 18 years of age and
              competent to enter into legally binding contracts. By accessing
              and/or using the Website and/or Services, you represent that you
              have read, understood and agree to be bound by these Terms and the
              Privacy Policy.
            </p>
          </div>

          <div className='para3'>
            <ol className='flex flex-col gap-5 list-decimal list-inside'>
              <div>
                <li>Use of the Website and Services</li>
                <ol className='flex flex-col gap-2 list-alpha list-inside'>
                  <li>
                    Information and Services: We endeavor to ensure the accuracy
                    of all information on the Website. However, by accessing or
                    using the Website or Services, you acknowledge that we shall
                    not be liable for any inadvertent inaccuracy or omission in
                    the information provided on the Website or in relation to
                    the Services.
                  </li>
                  <li>
                    Change of Terms: We reserve the right to update or revise
                    these Terms at any time without further notice. These
                    updates or revisions shall be effective as soon as they are
                    posted on the Website. If you continue to use the Website or
                    Services following such changes, you shall be deemed to have
                    accepted such changes. If you do not agree with the revised
                    or updated Terms, you are required to stop accessing and
                    using the Website and Services.
                  </li>
                </ol>
              </div>
              <div>
                <li>Purchases on the Website</li>
                <ol className='flex flex-col gap-2 list-alpha list-inside'>
                  <li>
                    These Terms apply to all purchases made by you and offers
                    availed by you on or through the Website.
                  </li>
                  <li>
                    Product listings on the Website do not amount to an offer by
                    us or a binding contract. The contract for purchase of any
                    such product by you is concluded only when we explicitly
                    confirm acceptance of your order in writing by email or by
                    display of an acceptance message on the Website.
                  </li>
                </ol>
              </div>
              <div>
                <li>Prices</li>
                <ol className='flex flex-col gap-2 list-alpha list-inside'>
                  <li>
                    The prices displayed for products on the Website may be
                    inclusive of Goods and Services Tax (GST) and if not, then
                    such GST shall be added separately to the cart. All the
                    prices are in Indian Rupees (INR).
                  </li>
                  <li>
                    We reserve the right to charge for delivery of products. The
                    final price displayed on the Website at the time of
                    confirmation of purchase and making of the final payment
                    shall be inclusive of all charges including delivery
                    charges.
                  </li>
                </ol>
              </div>
              <div>
                <li>Payments</li>
                <ol className='flex flex-col gap-2 list-alpha list-inside'>
                  <li>
                    We accept the following payment methods for purchases made
                    on the Website:
                    <ol className='flex flex-col gap-2 list-roman list-inside'>
                      <li>Credit or debit cards of most leading banks.</li>
                      <li>Net banking</li>
                      <li>UPI</li>
                    </ol>
                    br By choosing to make any payments on or through the
                    Website, you agree to all restrictions, terms and conditions
                    associated with such form of payment.
                  </li>
                  <li>
                    While availing any of the payment method/s available on the
                    Platform, we will not be responsible or assume any
                    liability, whatsoever in respect of any loss or damage
                    arising directly or indirectly to You due to:
                    <ul>
                      <li>Lack of authorization for any transaction/s, or</li>
                      <li>
                        Exceeding the present limit mutually agreed by You and
                        between "Bank/s", or
                      </li>
                      <li>
                        Any payment issues arising out of the transaction, or
                      </li>
                      <li>Decline of transaction for any other reason/s</li>
                    </ul>
                  </li>
                  <li>
                    The payment facility provided by us is neither a banking nor
                    financial service but is merely a facilitator providing an
                    electronic, automated online electronic payment, receiving
                    payment through cash on Delivery, collection and remittance
                    facility for the transactions undertaken on our Platform
                    using the existing authorized banking infrastructure and
                    credit card payment gateway networks. Further, by providing
                    payment facility, we are neither acting as trustees nor
                    acting in a fiduciary capacity with respect to the
                    transaction or the transaction Price.
                  </li>
                </ol>
              </div>
              <div>
                <li>Retention of Title</li>
                <ol className='flex flex-col gap-2 list-alpha list-inside'>
                  <li>
                    All Products will remain our property until you have paid
                    all amounts owed to us in full under any agreement,
                    including the payment of costs, earlier or later deliveries
                    or partial deliveries. You may not sell, dispose of, or
                    encumber any Product before full title thereof has passed to
                    you.
                  </li>
                </ol>
              </div>
              <div>
                <li>Delivery Mechanism</li>
                <ol className='flex flex-col gap-2 list-alpha list-inside'>
                  <li>
                    You are responsible for ensuring that the details you have
                    provided for delivery, including your address and other
                    contact details, are accurate. If the details provided are
                    incomplete or inaccurate, it may delay or otherwise affect
                    lead to cancellation of your order, along with levy of a
                    cancellation charge.
                  </li>
                  <li>
                    The expected delivery date will be displayed on the Website
                    before you complete your purchase. We may partner with
                    third-party logistics service providers in order to deliver
                    your purchased products to you. You agree that we may share
                    your contact information, to the extent reasonably
                    necessary, in order for such third-party logistics service
                    providers to deliver your purchased products to you.
                  </li>
                </ol>
              </div>
              <div>
                <li>Product Warranty and Guarantee</li>
                <p>
                  We expressly disclaim any warranty or guarantee in relation to
                  any product listed on the Website. In particular, please note
                  that all products on the Website are subject to availability
                  and minor differences in colour and/ or appearance from the
                  product listing on the Website. Non-availability of a product
                  or minor differences of colour and/ or appearance between the
                  product as listed on the Website and as delivered to you shall
                  not render us liable in any way, except as stated in these
                  Terms or required by law.
                </p>
              </div>
              <div>
                <li>
                  Your Conduct and Restrictions on Use of the Website and
                  Services
                </li>
                <p>
                  You acknowledge and understand that the Website may display or
                  make available information, data, text, software, music,
                  sound, photographs, graphics, video, or other materials
                  ("Content"), which has been uploaded, posted, emailed,
                  transmitted or otherwise made available by third parties. All
                  such content, whether publicly posted or privately
                  transmitted, is the sole responsibility of the person from
                  whom such Content originated. We do not control Content
                  originating from third parties, and as such do not guarantee
                  the accuracy, integrity or quality of such Content. Under no
                  circumstances will we be liable in any way for any Content,
                  including, but not limited to, any errors or omissions in any
                  Content, or any loss or damage of any kind incurred as a
                  result of the use of any Content posted, emailed, transmitted
                  or otherwise made available via the Website or Services by you
                  or by any third party.
                </p>
                <p>
                  In addition, you are solely responsible for any Content that
                  you upload, post, email, transmit or otherwise make available
                  via the Website or Services. You hereby agree that you shall
                  not use the Website or Services to do any of the following:
                  <ol className='list-alpha list-inside'>
                    <li>
                      carry out an activity that is unlawful or carry out any
                      activity in a manner that is unlawful
                    </li>
                    <li>
                      {' '}
                      upload, post, email, transmit or otherwise make available
                      any Content that is unlawful, harmful, threatening,
                      abusive, harassing, tortuous, defamatory, vulgar, obscene,
                      libellous, invasive of another's privacy, hateful, or
                      racially, ethnically or otherwise objectionable;
                    </li>
                    <li>harm minors in any way;</li>
                    <li>
                      impersonate any person or entity, including, but not
                      limited to, falsely stating or otherwise misrepresenting
                      your affiliation with a person or entity;
                    </li>
                    <li>
                      forge headers or otherwise manipulate identifiers in order
                      to disguise the origin of any Content;
                    </li>
                    <li>
                      upload, post, email, transmit or otherwise make available
                      any Content that you do not have a right to make available
                      under any applicable law or under contractual or fiduciary
                      relationships (such as inside information, trade secrets,
                      proprietary and confidential information learned or
                      disclosed as part of employment relationships or under
                      non-disclosure agreements);
                    </li>
                    <li>
                      upload, post, email, transmit or otherwise make available
                      any Content that infringes any patent, trademark, trade
                      secret, copyright or other proprietary rights of any
                      party;
                    </li>
                    <li>
                      upload, post, email, transmit or otherwise make available
                      any unsolicited or unauthorized advertising, promotional
                      materials, junk mail, spam, chain letters, pyramid schemes
                      or any other form of solicitation;
                    </li>
                    <li>
                      upload, post, email, transmit or otherwise make available
                      any material that contains software viruses or any other
                      computer code, files or programs designed to interrupt,
                      destroy or limit the functionality of any computer
                      software or hardware or telecommunications equipment;
                    </li>
                    <li>
                      interfere with or disrupt the Website or Services or
                      servers or networks connected to the Website and Services
                      or misuse the Website or Services in any manner
                      whatsoever;
                    </li>
                    <li>
                      copy, modify, distribute, lease, sell, or attempt to
                      reverse engineer or extract any part of the Website’s
                      software or source code without our express permission or
                      authorisation under applicable law;
                    </li>
                    <li>
                      intentionally or unintentionally violate any applicable
                      local, state, national or international law and any
                      regulations having the force of law; and/or
                    </li>
                    <li>
                      collect or store personal data about other users in
                      connection with the prohibited conduct and activities set
                      forth above.
                    </li>
                  </ol>
                </p>
              </div>
              <div>
                <li>Intellectual Property and Proprietary Rights</li>
                <p>
                  You agree that the intellectual property rights, including but
                  not limited to trademarks, patents, copyright and trade
                  secrets pertaining to any part of the Website, products listed
                  on the Website belong exclusively to us, other than content
                  that is owned by third parties. These rights include but are
                  not limited to rights in all trademarks, trade names, service
                  marks, other logos and brand features, product and service
                  names displayed on the Website, as well as all software code,
                  graphical elements and any other proprietary information. You
                  shall not in any manner display, use, copy, reproduce, store,
                  modify, transmit, distribute or otherwise infringe any of our
                  intellectual property without our express permission in
                  writing.
                </p>
              </div>
              <div>
                <li>Links</li>
                <p>
                  The Website may display or provide links to other websites or
                  resources. You acknowledge and agree that we are not
                  responsible for the availability of such external sites or
                  resources, and do not endorse and are not responsible or
                  liable for any content, advertising, products or other
                  materials on or available from such websites or resources. You
                  further acknowledge and agree that we shall not be responsible
                  or liable, directly or indirectly, for any damage or loss
                  caused or alleged to be caused by or in connection with use of
                  or reliance on any such content, goods or services available
                  on or through any such website or resource. These Terms and
                  the Privacy Policy do not apply to such third-party websites
                  or resources.
                </p>
              </div>
              <div>
                <li>Warranties</li>
                <p>
                  You expressly understand and agree that your use of the
                  Website is at your own risk. We provide the Website on an “as
                  is” and “as available” basis. We expressly disclaim all
                  warranties of any kind, whether express or implied, including
                  but not limited to the implied warranties of title,
                  merchantability, condition, availability, reliability,
                  continuity, accuracy, fitness for a particular purpose and
                  non-infringement.
                </p>
              </div>
              <div>
                <li>Electronic invoicing</li>
                <p>
                  Where we elect or are required by applicable law, to issue or
                  make available an invoice, we reserve the right to issue or
                  make available electronic invoices and you agree to such form
                  of invoicing.
                </p>
              </div>
              <div>
                <li>Limitation of Liability and Indemnity</li>
                <ol className='flex flex-col gap-2 list-alpha list-inside'>
                  <li>
                    You expressly understand and agree that we shall not be
                    liable to you for any punitive, indirect, incidental,
                    special, consequential or exemplary damages arising out of
                    your use of the Website or purchases made through the
                    Website, except as expressly stated in these Terms or
                    required by law.
                  </li>
                  <li>
                    You agree to indemnify and hold harmless the Company from
                    any claim or demand, including attorneys' fees, made by any
                    third party due to or arising out of your use of the Website
                    or purchases made through the Website.
                  </li>
                </ol>
              </div>
              <div>
                <li>Force Majeure</li>
                <p>
                  You agree that the Company shall not be held liable for any
                  unavailability, delay or deficiency of the Website or Services
                  or delivery of products purchased through the Website that
                  results, whether directly or indirectly, from events that
                  could not reasonably have been anticipated or controlled by
                  the Company. Such events include but are not limited to, acts
                  of God, floods, earthquakes, storms, fires, explosions,
                  lightning strikes, power failures, diseases, epidemics,
                  pandemics, failure of telecommunication or internet services,
                  acts of Government, and orders of any court or authority of
                  competent jurisdiction.
                </p>
              </div>
              <div>
                <li>Termination</li>
                <p>
                  We may, without prior notice and without any liability,
                  immediately terminate, limit your access to, or suspend your
                  access to the Website for any reason. Cause for such
                  termination, limitation of access or suspension shall include,
                  but not be limited to, (a) breaches or violations of these
                  Terms, (b) requests by law enforcement or other government
                  agencies, (c) discontinuance or material modification to the
                  Website (or any part thereof), (d) unexpected technical or
                  security issues or problems, (e) extended periods of
                  inactivity, (f) engagement by you in fraudulent or illegal
                  activities, and/or (g) non-payment of any fees or other
                  monetary liability owed by you in connection with the Website.
                </p>
              </div>
              <div>
                <li>Governing Law and Dispute Resolution</li>
                <p>
                  These Terms and the Privacy Policy shall be governed by and
                  construed in accordance with the laws of India. The courts at
                  Delhi, India shall have the exclusive jurisdiction to hear and
                  decide any disputes arising out of or in connection with these
                  Terms and/ or Privacy Policy.
                </p>
              </div>
              <div>
                <li>General Information</li>
                <ol className='flex flex-col gap-2 list-alpha list-inside'>
                  <li>
                    The provisions of these Terms are severable. In the event
                    that any provision is held unenforceable, such provision
                    shall be severed and shall not affect the enforceability of
                    the remaining provisions of these Terms.
                  </li>
                  <li>
                    Our failure to exercise or enforce any right or provision of
                    these Terms shall not constitute a waiver of such right or
                    provision. If any provision of these Terms is found by a
                    court of competent jurisdiction to be invalid, the parties
                    nevertheless agree that the court should endeavour to give
                    effect to the parties' intentions as reflected in the
                    provision, and the other provisions of these Terms remain in
                    full force and effect.
                  </li>
                </ol>
                <p className='mt-7'>
                  Questions about the Terms of Service should be sent to us at
                  tnzcreations1@gmail.com.
                </p>
              </div>
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}

export default TOSComp
