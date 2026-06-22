import { useState } from "react";

function Payment() {
  const [showReceipt, setShowReceipt] = useState(false);

  const handlePayment = () => {
    setShowReceipt(true);
  };

  return (    
    <div className="min-h-screen font-sans text-gray-800 antialiased box-border m-0 p-0">
      <main className="flex-1 flex justify-center items-center p-[30px]">
        {/* Payment Card */}
        <div className="w-[500px] bg-white p-[30px] rounded-[10px] shadow-[0px_4px_15px_rgba(0,0,0,0.15)]">
          <h2 className="text-center text-xl font-bold text-[#003366] mb-[25px]">
            Online Service Payment
          </h2>

          {/* Details Section */}
          <div className="space-y-[12px] text-[16px]">
            <p>
              <strong className="font-bold">Application ID:</strong> APP1023
            </p>
            <p>
              <strong className="font-bold">Applicant Name:</strong> Anwesha Banerjee
            </p>
            <p>
              <strong className="font-bold">Service:</strong> Certified Copy of Khatian
            </p>
            <p>
              <strong className="font-bold">Date:</strong> 01 June 2026
            </p>
            <p className="text-green-600 text-2xl font-bold mt-[15px]">
              Amount Payable: ₹120
            </p>
          </div>

          {/* Proceed to Pay Button */}
          {!showReceipt && (
            <button 
              className="w-full mt-[25px] p-[14px] bg-[#198754] hover:bg-[#157347] text-white border-none rounded-[6px] text-[16px] font-medium cursor-pointer transition-colors"
              onClick={handlePayment}
            >
              Proceed to Pay
            </button>
          )}

          {/* Payment Receipt */}
          {showReceipt && (
            <div className="mt-[25px] p-5 border-2 border-[#198754] rounded-[8px] bg-[#f8fff9]">
              <h3 className="text-center font-bold text-[#198754] mb-[15px] text-lg">
                PAYMENT RECEIPT
              </h3>

              <div className="space-y-[8px] text-sm md:text-base">
                <p><strong className="font-bold">Receipt No:</strong> REC1023</p>
                <p><strong className="font-bold">Transaction ID:</strong> TXN56789</p>
                <p><strong className="font-bold">Application ID:</strong> APP1023</p>
                <p><strong className="font-bold">Applicant Name:</strong> Anwesha Banerjee</p>
                <p><strong className="font-bold">Service:</strong> Certified Copy of Khatian</p>
                <p><strong className="font-bold">Amount Paid:</strong> ₹120</p>
                <p><strong className="font-bold">Date:</strong> 01 June 2026</p>
              </div>

              <p className="text-green-600 font-bold text-center mt-[15px]">
                ✓ PAYMENT SUCCESSFUL
              </p>

              <button
                className="w-full mt-[15px] p-[12px] bg-[#003366] hover:bg-[#002244] text-white border-none rounded-[6px] cursor-pointer transition-colors"
                onClick={() => window.print()}
              >
                Print Receipt
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Payment;