import React, { useState, useEffect } from "react";
import { API_CASE_FUND } from "../../services/ApiConstant";
import { get } from "../../services/Api";
import { Card, CardBody, CardTitle, CardText, Row, Col, Tooltip } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const MyFunds = () => {
    const [data, setData] = useState({});
    const [columns, setColumns] = useState(calculateColumns());

    useEffect(() => {
        getFundList();
    }, []);

    function convertToTitleCase(str) {
        return str
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function calculateColumns() {
        const width = window.innerWidth - 60;
        const minColumnWidth = 400;
        return Math.floor(width / minColumnWidth);
    }

    useEffect(() => {
        const handleResize = () => {
            setColumns(calculateColumns());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getFundList = async () => {
        const response = await get(API_CASE_FUND);
        setData(response);
    };


    const fields = Object.keys(data);
    const columnSize = Math.floor(12 / columns);

    const FieldCard = () => {
      const [tooltipOpen, setTooltipOpen] = useState({});


    const toggleTooltip = (id) => {
      setTooltipOpen(prevState => ({
          ...prevState,
          [id]: !prevState[id]
      }));
  };
        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }

        return (
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Fund Overview</CardTitle>
                    <br />
                    <div style={{ color: 'blue', padding: 0, fontSize: 16 }}>Lifetime Stats</div>

                    <Row style={{ padding: 15 }}>
                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Fund Size</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer",marginLeft: 5, color: 'grey' }}
                                    id="FundSizeTooltip"

                                ></i>
                                <Tooltip
                                    placement="bottom"
                                    isOpen={tooltipOpen.FundSizeTooltip}
                                    target="FundSizeTooltip"
                                    toggle={() => toggleTooltip('FundSizeTooltip')}
                                >
                                    Corpus fund size
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["fund_corpus"])}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Cases Funded</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="CasesFundedTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.CasesFundedTooltip}
                                    target="CasesFundedTooltip"
                                    toggle={() => toggleTooltip('CasesFundedTooltip')}
                                >
                                    Cases approved and funded till date including closed cases
                                </Tooltip>
                            </div>
                            <CardText>{data?.["cases_to_date"]}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Benefactors Funded</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="BenefactorsFundedTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.BenefactorsFundedTooltip}
                                    target="BenefactorsFundedTooltip"
                                    toggle={() => toggleTooltip('BenefactorsFundedTooltip')}
                                >
                                    Unique benefactors that have either received grants or are approved to receive one
                                </Tooltip>
                            </div>
                            <CardText>{data?.["unique_benefactors"]}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Funds Committed</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="FundsCommittedTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.FundsCommittedTooltip}
                                    target="FundsCommittedTooltip"
                                    toggle={() => toggleTooltip('FundsCommittedTooltip')}
                                >
                                    Total funds approved for grants till date including disbursed amounts
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["committed"])}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Lifetime Disbursement</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="LifetimeDisbursementTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.LifetimeDisbursementTooltip}
                                    target="LifetimeDisbursementTooltip"
                                    toggle={() => toggleTooltip('LifetimeDisbursementTooltip')}
                                >
                                    Total funds disbursed till date
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["lifetime_disbursement"])}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Gross Repayable</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="GrossRepayableTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.GrossRepayableTooltip}
                                    target="GrossRepayableTooltip"
                                    toggle={() => toggleTooltip('GrossRepayableTooltip')}
                                >
                                    Sum total of all receivables in cash and in service for approved or disbursed cases
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["repayable"])}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Repayable in Cash</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="RepayableInCashTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.RepayableInCashTooltip}
                                    target="RepayableInCashTooltip"
                                    toggle={() => toggleTooltip('RepayableInCashTooltip')}
                                >
                                    Sum total of all receivables in cash for approved or disbursed cases
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["reypayble_in_cash"])}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Repayable in Service</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="RepayableInServiceTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.RepayableInServiceTooltip}
                                    target="RepayableInServiceTooltip"
                                    toggle={() => toggleTooltip('RepayableInServiceTooltip')}
                                >
                                    Sum total of all receivables in service for approved or disbursed cases
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["reypayble_in_service"])}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Non Repayable</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="NonRepayableTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.NonRepayableTooltip}
                                    target="NonRepayableTooltip"
                                    toggle={() => toggleTooltip('NonRepayableTooltip')}
                                >
                                    Net of committed funds and receivables either in cash or in service
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["non_repayable"])}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Cash Deficit</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="CashDeficitTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.CashDeficitTooltip}
                                    target="CashDeficitTooltip"
                                    toggle={() => toggleTooltip('CashDeficitTooltip')}
                                >
                                    Funds that is not expected to be returned in cash. This equals to the sum of amounts that are either non repayable or repaybale in service
                                </Tooltip>
                            </div>
                            <CardText>{data?.["deficit"]}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Repayment Received</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="RepaymentReceivedTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.RepaymentReceivedTooltip}
                                    target="RepaymentReceivedTooltip"
                                    toggle={() => toggleTooltip('RepaymentReceivedTooltip')}
                                >
                                   Net of all repayments received till date in cash and in service
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["repaid"])}</CardText>
                        </Col>
                    </Row>

                    <div style={{ color: 'blue', fontSize: 16 }}>Current Stats</div>
                    <Row style={{ padding: 15 }}>
                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Available for Commitment</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="AvailableForCommitmentTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.AvailableForCommitmentTooltip}
                                    target="AvailableForCommitmentTooltip"
                                    toggle={() => toggleTooltip('AvailableForCommitmentTooltip')}
                                >
                                    Funds that can be comitted for future grants, calculated as (Fund Size - Funds Committed + Repayments Received)
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["available"])}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Approved Active Cases</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="ApprovedActiveCasesTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.ApprovedActiveCasesTooltip}
                                    target="ApprovedActiveCasesTooltip"
                                    toggle={() => toggleTooltip('ApprovedActiveCasesTooltip')}
                                >
                                   Count of approved cases still in service and not in closed state
                                </Tooltip>
                            </div>
                            <CardText>{data?.["active_cases"]}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Cases Pending Approval</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="CasesPendingApprovalTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.CasesPendingApprovalTooltip}
                                    target="CasesPendingApprovalTooltip"
                                    toggle={() => toggleTooltip('CasesPendingApprovalTooltip')}
                                >
                                    Count of new cases pending approval
                                </Tooltip>
                            </div>
                            <CardText>{data?.["pending_cases"]}</CardText>
                        </Col>

                        <Col sm={columnSize} className="mb-3">
                            <div>
                                <strong>Amount Pending Approval</strong>
                                <i
                                    className="bi bi-info-circle"
                                    style={{ cursor: "pointer", marginLeft: 5, color: 'grey' }}
                                    id="AmountPendingApprovalTooltip"
                                ></i>
                                <Tooltip
                                    placement="right"
                                    isOpen={tooltipOpen.AmountPendingApprovalTooltip}
                                    target="AmountPendingApprovalTooltip"
                                    toggle={() => toggleTooltip('AmountPendingApprovalTooltip')}
                                >
                                    Sum total of the requested amounts across all new cases awaiting approval
                                </Tooltip>
                            </div>
                            <CardText>{formatCurrency(data?.["requested_amount"])}</CardText>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <FieldCard />
        </div>
    );
};

export default MyFunds;
