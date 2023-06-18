import stringCathegoryConstants from '../databases/repConst';
import repFlameCat from './repFlameCat';
import repVesselPipeCat from './repVesselPipeCat';

const getCommonData = (epReferenceData, epData) => {
  const { minConditions, cathegories } = epReferenceData;

  const { presMin, volMin, dnMin, presToCatIV, volMaxArt43 } = minConditions;

  const { ps, volume, dn } = epData;

  return {
    presMin,
    volMin,
    dnMin,
    presToCatIV,
    volMaxArt43,
    cathegories,
    ps,
    volume,
    dn,
  };
};

function repVesselsPipesCathegorization(epReferenceData, epData) {
  // const { minConditions, cathegories } = epReferenceData;

  // const { presMin, volMin, dnMin } = minConditions;

  // const { ps, volume, dn } = epData;

  const { cathegories, presMin, volMin, dnMin, ps, volume, dn } = getCommonData(
    epReferenceData,
    epData
  );

  if (ps <= presMin || (volume && volume <= volMin) || (dn && dn <= dnMin))
    return stringCathegoryConstants.notREP;

  const result = repVesselPipeCat(cathegories, ps, volume, dn);

  return result;
}

function repFlameCathegorization(epReferenceData, epData) {
  // const { minConditions, cathegories } = epReferenceData;

  // const { presMin, volMin, presToCatIV, volMaxArt43 } = minConditions;

  // const { ps, volume } = epData;

  const { cathegories, presMin, volMin, presToCatIV, volMaxArt43, ps, volume } =
    getCommonData(epReferenceData, epData);

  if (ps <= presMin || volume <= volMin) return stringCathegoryConstants.notREP;
  if (ps > presToCatIV && volume > volMaxArt43)
    return stringCathegoryConstants.IV;

  const result = repFlameCat(cathegories, ps, volume);

  return result;
}

export default function repCathegorization(state) {
  if (
    state.fluidCathegory === '' ||
    state.volume < state.minConditions.volMin ||
    state.ps < state.minConditions.presMin ||
    state.dn < state.minConditions.dnMin
  )
    return null;

  let resultat;

  //TODO Diferenciar entre los recipientes y el resto de tipos de equipos a presión

  if (state.epType === 'vessels' || state.epType === 'pipes')
    resultat = repVesselsPipesCathegorization(state, state);
  if (state.epType === 'flame')
    resultat = repFlameCathegorization(state, state);

  return resultat;
}
