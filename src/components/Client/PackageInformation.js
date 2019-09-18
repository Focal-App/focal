import React, { useState } from "react";

const PackageInformation = ({ clientPackage, apiHandler, setClient }) => {
    if (clientPackage) {
        const {
            package_name, uuid, proposal_signed, package_contents, package_price,
            retainer_price, retainer_paid_amount, retainer_paid, discount_offered, balance_remaining, balance_received
        } = clientPackage;

        return (
            <section className="client-package--container">
                <div className="client-page--header">
                    <h1>Package</h1>
                </div>
                <section className="package-information">
                    <h2>{package_name}</h2>
                    <h4>{package_contents}</h4>

                    <hr />

                    <div className="cost-line">
                        <h4>${package_price}</h4>
                        <h4>${discount_offered}</h4>
                        <h4>${retainer_paid_amount}</h4>
                        <hr />
                        <h4>${balance_remaining}</h4>
                    </div>
                    
                    <div className="cost-description">
                        <h6>Package Price</h6>
                        <h6>Discount</h6>
                        <h6>Retainer Price Paid ({retainer_price})</h6>
                        <div />
                        <h6>Remaining Balance</h6>
                    </div>

                    <hr />

                    <BooleanLine completed={retainer_paid} label={"Retainer Paid"} />
                    <BooleanLine completed={proposal_signed} label={"Proposal Signed"} />
                    <BooleanLine completed={balance_received} label={"Balance Received"} />
                </section>
            </section>
        )
    } else {
        return null;
    }
}

const BooleanLine = ({ completed, label }) => (
    <div className="boolean-line">
        <div className={`checkmark--small ${completed ? 'checkmark--complete' : 'checkmark--incomplete'}`}>
            <i className="far fa-check-square"></i>
        </div>
        <h4>{label}</h4>
    </div>
)

export default PackageInformation;