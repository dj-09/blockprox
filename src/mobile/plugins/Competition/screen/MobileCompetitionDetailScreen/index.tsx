import { setDocumentTitle } from 'helpers';
import _toNumber from 'lodash/toNumber';
import _toUpper from 'lodash/toUpper';
import { fetchCompetitionItem, fetchCompetitionVolume, selectVolumeCompetition } from 'modules';
import { selectItemCompetition } from 'modules/plugins/competition';
import { CompetitionInfo, RankingCompetition, CompetitionAward } from '../../containers';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { GoBackIcon } from 'mobile/assets/icons';

export const MobileCompetitionDetailScreen = () => {
	const history = useHistory();
	const { competition_id } = useParams<{ competition_id: string }>();
	const dispatch = useDispatch();
	const userVolume = useSelector(selectVolumeCompetition);
	const competition = useSelector(selectItemCompetition);
	const {
		currency_id,
		start_date,
		end_date,
		type,
		market_ids,
		min_value,
		next_update,
		limit_display,
		status,
	} = competition.payload;
	setDocumentTitle(`${_toUpper(currency_id)} Competition Detail`);
	React.useEffect(() => {
		dispatch(
			fetchCompetitionItem({
				competition_id: _toNumber(competition_id),
			}),
		);
		dispatch(
			fetchCompetitionVolume({
				competition_id: _toNumber(competition_id),
			}),
		);
	}, []);
	const dispatchFetchCompetition = () =>
		dispatch(
			fetchCompetitionItem({
				competition_id: _toNumber(competition_id),
			}),
		);

	return (
		<div id="mobile-competition-detail-screen" className="container-fluid">
			<div className="td-mobile-competition-detail__header">
				<GoBackIcon className="td-mobile-competition-detail__header__goback" onClick={() => history.goBack()} />
				<h3 className="td-mobile-competition-detail__header__title">{_toUpper(currency_id)} Competition</h3>
			</div>
			<CompetitionInfo
				loading={competition.loading || userVolume.loading}
				currency_id={currency_id}
				start_date={start_date}
				end_date={end_date}
				type={type}
				markets={market_ids ? market_ids.split(',') : []}
				volume={Number(userVolume.payload.volume)}
				next_update={next_update}
				status={status}
				dispatchFetchCompetition={dispatchFetchCompetition}
				min_value={min_value}
			/>
			<CompetitionAward competition_id={Number(competition_id)} />
			<RankingCompetition
				loading={competition.loading}
				limit_display={_toNumber(limit_display)}
				competition_id={_toNumber(competition_id)}
			/>
		</div>
	);
};
