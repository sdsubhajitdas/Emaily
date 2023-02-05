import moment from "moment";
import { useState } from "react";

export default function SurveyCard({
  survey: { _id, title, subject, body, yes, no, dateSent, lastResponded },
  deleteSurvey,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const labelStyle = "text-sm text-secondary font-medium";
  const voted = !(yes === 0 && no === 0);
  dateSent = dateSent ? moment(dateSent).format("h:mm a, Do MMM YY") : null;
  lastResponded = lastResponded
    ? moment(lastResponded).format("h:mm a, Do MMM YY")
    : null;

  let yesPercentage, noPercentage;

  if (voted) {
    const totalVotes = yes + no;
    yesPercentage = (yes / totalVotes) * 100;
    noPercentage = (no / totalVotes) * 100;
  }

  return (
    <div className="card w-full bg-primary text-primary-content">
      <div className="card-body">
        <section>
          <label className={labelStyle}>Survey Title</label>
          <h3 className="card-title">{title}</h3>
        </section>
        <section>
          <label className={labelStyle}>Email</label>
          <div className="bg-primary-focus text-base rounded-lg px-3 py-2">
            <div className="flex">
              <label className="text-secondary-focus">Subject:</label>
              <p className="ml-3">{subject}</p>
            </div>
            <div className="flex mt-3">
              <label className="text-secondary-focus mr-3.5">Body:</label>
              <p className="ml-3">{body}</p>
            </div>
          </div>
        </section>

        <section className="mt-2">
          <label className={labelStyle}>Votes</label>
          <div className="flex w-full">
            {!voted && (
              <div
                className="bg-gray-500 px-5 rounded-full text-center"
                style={{ width: "100%" }}
              >
                No feedback yet
              </div>
            )}

            {yesPercentage > 0 && voted && (
              <div
                className={`bg-green-500 px-5 rounded-l-full ${
                  yesPercentage === 100
                    ? "rounded-r-full text-center"
                    : "text-left pl-10"
                }`}
                style={{ width: `${yesPercentage}%` }}
              >
                {yes}
              </div>
            )}

            {noPercentage > 0 && voted && (
              <div
                className={`bg-rose-500 px-5 rounded-r-full ${
                  noPercentage === 100
                    ? "rounded-l-full text-center"
                    : "text-right pr-10"
                }`}
                style={{ width: `${noPercentage}%` }}
              >
                {no}
              </div>
            )}
          </div>
        </section>

        <section className="flex justify-between text-slate-300 text-sm mt-2">
          {dateSent && (
            <div className="text-center">
              <p>Created at</p>
              <p>{dateSent}</p>
            </div>
          )}
          {lastResponded && (
            <div className="text-center">
              <p>Last responded at</p>
              <p>{lastResponded}</p>
            </div>
          )}
        </section>
        <section className="flex flex-row-reverse mt-4 gap-3">
          {!confirmDelete && (
            <button
              className="btn btn-sm btn-active btn-ghost"
              onClick={() => setConfirmDelete((prev) => !prev)}
            >
              Delete
            </button>
          )}
          {confirmDelete && (
            <button
              className="btn btn-sm btn-active btn-ghost"
              onClick={() => setConfirmDelete((prev) => !prev)}
            >
              No
            </button>
          )}
          {confirmDelete && (
            <button
              className="btn btn-sm btn-active btn-ghost"
              onClick={() => deleteSurvey(_id)}
            >
              Yes
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
