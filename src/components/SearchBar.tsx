import {GoogleAutoCompletePrediction, GoogleBusiness, YelpBusiness} from "../types";
import React, {createRef, useMemo, useState} from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {getGoogleRestaurantResults, getLatLong, getLocationAutoComplete} from "../service/googleMapService";
import debounce from "lodash.debounce";
import {getYelpResults} from "../service/yelpService";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import { joinDataSources } from '../utilities';

interface SearchBarProps {
  handleSearchResults: (a: Map<string, Array<YelpBusiness|GoogleBusiness>>) => void;
  latLong: Array<string>;
  searchAreaTerm: Array<string>;
  searchBoxTerm: string;
  setLatLongValues: (a: Array<string>) => void;
  setSearchAreaValues: (a: Array<string>) => void;
  setSearchTermValues: (a: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const [options, setCityOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const selectLocationDropdown = createRef<AsyncTypeahead<string>>();

  const changeHandler = (locationText: string) => {
    setLoading(true);
    getLocationAutoComplete(locationText).then((res) => {
      const formattedData = res.predictions
        .map((val: GoogleAutoCompletePrediction) => val.description);
      setCityOptions(formattedData);
    })
      .finally(() => setLoading(false));
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), []);

  const handleMenuClose = (menuOpen: boolean) => {
    const selectedVal = selectLocationDropdown.current?.getInput().value;

    if (!menuOpen && selectedVal) {
      props.setSearchAreaValues([selectedVal || props.searchAreaTerm[0]]);
      getLatLong(selectedVal).then((res) => {
        const { lng, lat } = res.results[0].geometry.location;
        props.setLatLongValues([lng, lat]);
      });
    }
  }

  //TODO(miketran): Validation of inputs.
  /**
   * Kicks off search when both inputs are inputted.
   * @param evt
   */
  const handleSearch = (evt: any) => {
    evt.preventDefault();
    Promise.all([
      getYelpResults(props.searchBoxTerm, props.latLong[0], props.latLong[1]),
      getGoogleRestaurantResults(`${props.latLong[1]},${props.latLong[0]}`,props.searchBoxTerm )
    ]).then((res) => {
      const newDataMap = joinDataSources(res);
      props.handleSearchResults(newDataMap)
    })
  }

  const clearLocationInput = () => {
    selectLocationDropdown.current?.clear();
  }

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>Find:</InputGroup.Text>
      <FormControl
        placeholder="Find..."
        aria-label="Find what?"
        aria-describedby="basic-addon2"
        type={"text"}
        value={props.searchBoxTerm}
        onChange={(evt) => props.setSearchTermValues(evt.target.value)}
      />
      <InputGroup.Text>Nearby:</InputGroup.Text>
      <AsyncTypeahead
        defaultSelected={props.searchAreaTerm}
        id="selections-example"
        onSearch={(text: string) => { debouncedChangeHandler(text); }}
        options={options}
        ref={selectLocationDropdown}
        placeholder="Choose a city..."
        isLoading={isLoading}
        onMenuToggle={handleMenuClose}
        onFocus={clearLocationInput}
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleSearch}>Search
      </Button>
    </InputGroup>
  );
}
