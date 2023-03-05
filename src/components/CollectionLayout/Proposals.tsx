import { Button, ButtonGroup, ProgressBar } from "@primer/react";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const proposals = () => (
  <motion.div
    className="flex w-full flex-col"
    variants={FADE_DOWN_ANIMATION_VARIANTS}
  >
    <div className="w-full">
      <div className="relative flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg ">
        <div className="mb-0 rounded-t border-0 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow px-4">
              <h3 className="text-blueGray-700 text-basefont-semibold whitespace-nowrap">
                Derug submissions
              </h3>
            </div>
            <div className="relative w-full max-w-full flex-1 flex-grow justify-end px-4 text-right">
              <Button sx={{}}>Add reguest</Button>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="text-blueGray-700 w-full border-collapse items-center  ">
            <thead className="thead-light ">
              <tr>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Referral
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Visitors
                </th>
                <th className="bg-blueGray-50 text-blueGray-700 border-blueGray-100 min-w-140-px whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase"></th>
                <th className="bg-blueGray-50 text-blueGray-700 border-blueGray-100 min-w-140-px whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  Request #0
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                  1,480
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <ProgressBar progress={30} />
                </td>

                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <ButtonGroup>
                    <Button>❌</Button>
                    <Button>✅</Button>
                  </ButtonGroup>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  Request #1
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  5,480
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <ProgressBar progress={10} />
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <ButtonGroup>
                    <Button>❌</Button>
                    <Button>✅</Button>
                  </ButtonGroup>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  Request #2
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  4,807
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <ProgressBar progress={16} />
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <ButtonGroup>
                    <Button>❌</Button>
                    <Button>✅</Button>
                  </ButtonGroup>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  Request #3
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  3,678
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <ProgressBar progress={33} />
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <ButtonGroup>
                    <Button>❌</Button>
                    <Button>✅</Button>
                  </ButtonGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </motion.div>
);
