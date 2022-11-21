import React, { useRef } from "react";
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css';
import { Portuguese } from "flatpickr/dist/l10n/pt.js";



 const options = {
    
    locale: {
      ...Portuguese,
      months: {
        ...Portuguese.months
      }
    },
    mode: 'single',
    altInputClass: 'hide',
    enableTime: true,
    minTime: "09:00",
    maxTime: "18:30",
    altInput: true,
    altFormat: "d/m/Y - H:i",
    dateFormat: 'm-d-y H:i',    
    minDate: "today",
    maxDate: new Date().fp_incr(31),
    

    // THIS `wrap` option is required when using external elements!
    // https://flatpickr.js.org/examples/#flatpickr-external-elements
    wrap: true,
  }

const Calendar = () => {
  return (
    <Flatpickr
      data-input
      options={options}

    >
      {/* Button and input should be the children of flatpickr * /}
      {/* as per the official flatpickr.js example above */}

      {/* toggle butotn should have `data-toggle` attribute */}
      <button data-toggle>Selecione</button>

      {/* input field should have `data-input` attribute */}
      <input type="text" placeholder="Data e Horário" data-input />
    </Flatpickr>
  )
}

export default function DateTime() {
  return (
    <div>
      <Calendar />
    </div>
  );
}