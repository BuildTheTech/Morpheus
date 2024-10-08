export default function Leaderboard() {
  return (
    <div
      className="box w-full pt-[30px] sm:pt-[42px] sm:pb-[36px] pb-[20px] px-[10px] sm:px-[45px] relative overflow-hidden bg-no-repeat bg-cover "
      style={{ backgroundImage: "url('/assets/images/leaderboard-bg.png')" }}
    >
      <div>
        <h4 className="head-h4 text-center sm:leading-[34px]">LEADERBOARD</h4>

        <div className="mt-[32px]">
          <table className="table-auto w-full border-separate border-spacing-y-[14px]">
            <thead>
              <tr>
                <th className="text-white text-[10px] sm:text-[16px] font-normal  sm:leading-[19px]">
                  RANK
                </th>
                <th className="text-white text-[10px] sm:text-[16px] font-normal sm:leading-[19px]">
                  USER
                </th>
                <th className="text-white text-[10px] sm:text-[16px] font-normal text-end sm:pr-[20px] whitespace-nowrap sm:leading-[19px]">
                  TOKENS MINTED
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((dt, i) => (
                <tr
                  key={i}
                  className="   border last:border-b-none rounded-[8px]"
                  style={{
                    boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
                  }}
                >
                  <td className="text-[white] text-center text-[12px] sm:text-[20px]   py-[13px] border-primary/50 border-r-0 border rounded-l-[16px] bg-[#030D03] xl:px-[20px] px-[10px] sm:leading-[24px]">
                    {dt.rank}
                  </td>
                  <td className="text-primary text-center text-[12px] sm:text-[20px]   py-[13px] border-primary/50  border-y bg-[#030D03] sm:leading-[24px]">
                    {dt.user}
                  </td>
                  <td className="text-[white] text-center text-[12px] sm:text-[20px]   py-[13px] border-primary/50 border-l-0 border rounded-r-[16px] bg-[#030D03] sm:leading-[24px]">
                    {dt.token}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="text-white urbanist-font text-[16px] sm:text-[20px] gd-btn sm:py-[13px] py-2 sm:px-[64px] px-8 rounded-[16px] mx-auto w-fit block mt-[6px] leading-none">
          LOAD MORE
        </button>
      </div>
    </div>
  );
}

const data = [
  {
    rank: "1st",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "2nd",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "3rd",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "4th",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "5th",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "6th",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "7th",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "8th",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "9th",
    user: "0x644...ax637f",
    token: "563.8M",
  },
  {
    rank: "10th",
    user: "0x644...ax637f",
    token: "563.8M",
  },
];
