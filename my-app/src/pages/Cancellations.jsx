import React from "react";
import Ribbons from "../components/Ribbons";

const Cancellations = () => {
  const cancellationData = [
    {
      title: "Cancellations Policy:",
      info: "Once you have placed an order you have entered into a contract, However we understand that cancellations are needed to be made from time to time, our cancellation terms are outlined below and are designed to be very reasonable. The policy is only in place to protect both our and your best interests and ensure that our out of pocket expenses are covered. It is not designed to be profitable on our part;",
    },
    {
      title: "Orders up to £100:",
      info: "Cancellations are accepted. All we ask is that you cancel the order before 12noon on the friday before your event. Should your order be cancelled after 12noon on the friday before your event or on the day of the event (including refusal of delivery on arrival) your order will be subject to a 100% cancellation fee (Reduced to 50% if paid within 7 days) to cover cost already laid out for your booking such as the testing and organising of your entertainment, loading up, vehicle & generator hire and staff commitments which will now have to be paid for regardless of weather your event goes ahead or not. All payments made will be treated as a booking fee and not a deposit and as such, non refundable.",
    },
    {
      title: "Orders between £100 and £200:",
      info: "Cancellations are accepted but must be made at least 7 days in advance of the event in order not to incur a cancellation charge. Cancellations made between 7 days in advance of the event and up until 12noon on the day before your event will be subject to a 50% cancellation fee (Reduced to 15% if paid within 7 days)to cover our costs. Should your order be cancelled after 12noon on the day before your event or on the day of the event (including refusal of delivery on arrival) your order will be subject to a 100% cancellation fee to cover cost already laid out for your booking such as the testing and organising of your entertainment, loading up, vehicle & generator hire and staff commitments which will now have to be paid for regardless of weather your event goes ahead or not. All payments made will be treated as a booking fee and not a deposit and as such, non refundable.",
    },
    {
      title: "Orders between £200 and £400:",
      info: "Cancellations are accepted but must be made at least 14days in advance of the event in order not to incur a cancellation charge. Cancellations made between 14 days in advance of the event and up until 12noon on the day before your event will be subject to a 50% cancellation (Reduced to 25% if paid within 7 days) fee to cover our costs. Should your order be cancelled after 12noon on the day before your event or on the day of the event (including refusal of delivery on arrival) your order will be subject to a 100% cancellation (Reduced to 50% if paid within 7 days) fee to cover cost already laid out for your booking such as the testing and organising of your entertainment, loading up, vehicle & generator hire and staff commitments which will now have to be paid for regardless of weather your event goes ahead or not. All payments made will be treated as a booking fee and not a deposit and as such, non refundable.",
    },
    {
      title: "Orders over £400:",
      info: " Unfortunately all orders over the value of £400 are subject to a 50% cancellation fee regardless of when the order or cancellation is made due to the large amount of preparation and event management that will have taken place already that must be recovered. Should your order be cancelled after 12noon on the day before your event or on the day of the event (including refusal of delivery on arrival) your order will be subject to a 100% cancellation fee (Reduced to 50% if paid within 7 days) to cover cost already laid out for your booking such as the testing and organising of your entertainment, loading up, vehicle & generator hire and staff commitments which will now have to be paid for regardless of weather your event goes ahead or not. All payments made will be treated as a booking fee and not a deposit and as such, non refundable.",
    },
    {
      title: "Cancellations on arrival due to not fitting: ",
      info: "All sizes and dimensions are clearly displayed on our website. Should we arrive on the day and the items not fit in your chosen venue or event area your order will be subject to a 100% cancellation fee to cover cost already laid out for your booking such as the testing and organising of your entertainment, loading up, vehicle & generator hire and staff commitments which will now have to be paid for regardless of weather your event goes ahead or not. No exceptions. We will try our best to provide an alternative or accommodate the relocation of the entertainment, however our event staff will only have a finite amount of time allocated to your booking and must keep a tight schedule in order not disrupt other bookings on that day. All payments made will be treated as a booking fee and not a deposit and as such, non refundable.",
    },
    {
      title: "Generators:",
      info: "All generators are non refundable as they are hired in on your behalf. There is no course for Fun factor Leeds to recover costs associated with the hire as payment is paid up front and in advance at the time of your booking on your behalf. Additional fuel charges are however 100% refundable.",
    },
    {
      title: "Refusal of delivery:",
      info: "Should our team arrive at your venue and for whatever reason you cancel the booking your order will be subject to a 100% cancellation fee (Reduced to 50% if paid within 7 days) to cover cost already laid out for your booking such as the testing and organising of your entertainment, loading up, fuel costs, vehicle & generator hire and staff commitments which will have to be paid for regardless of weather your event goes ahead or not. WET OR BAD WEATHER IS NOT A VALID REASON FOR TURNING US AWAY WITHOUT NOTICE AND THE CANCELLATION CHARGE WILL STILL APPLY. The only way in which to avoid a penalty is to provide our delivery team with a copy of your Cancellation Confirmation. Failure to pay on the day will result in your case being presented to Daniel Silverman Ltd as outlined below.",
    },
    {
      title: "Bulk orders:",
      info: "Cancellation of bulk orders and multiple event date carries a strict 50% cancellation fee (Reduced to 25% if paid within 7 days) on ALL BOOKED EVENTS. This is due to the number of resources and equipment tied up on multiple dates across the year. Under no circumstances will any refund be given. The charge is a calculation based on a mixture lost revenue from previous examples of bulk cancellations, staff resources and administration already dedicated to your events and lack of availability of items to other clients as a result. This charge is designed to cover our costs and not make a profit from your misfortune.",
    },
  ];
  return (
    <main className="flex items-start w-full">
      <section className="mt-[1vw] hidden lg:block">
        <Ribbons />
      </section>
      <section className="mt-[1vw] w-full">
        <h1 className="text-[#ed145b] mt-[4vw] text-center text-[7vw] lg:text-left lg:text-[2.3vw] font-medium font-ab">
          CANCELLATIONS…
        </h1>
        <article className="flex flex-col gap-[1vw] mt-[1vw]">
          {cancellationData.map((cancellation, ind) => (
            <div className="flex" key={ind}>
              <p className="  lg:text-[1vw] p-[3vw] lg:p-[0vw] font-pt w-full lg:max-w-[65vw]">
                <span className="font-bold font-pt">{cancellation.title}</span> {cancellation.info}
              </p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
};

export default Cancellations;
