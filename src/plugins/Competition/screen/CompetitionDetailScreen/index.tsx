import { setDocumentTitle } from 'helpers';
import _toNumber from 'lodash/toNumber';
import _toUpper from 'lodash/toUpper';
import { fetchCompetitionItem, fetchCompetitionVolume, selectVolumeCompetition } from 'modules';
import { selectItemCompetition } from 'modules/plugins/competition';
import { CompetitionInfo, RankingCompetition, CompetitionAward } from 'plugins/Competition/containers';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useIntl } from 'react-intl';

export const CompetitionDetailScreen = () => {
	const intl = useIntl();
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
		next_update,
		limit_display,
		status,
		min_value,
	} = competition.payload;
	setDocumentTitle(`${_toUpper(currency_id)} ${intl.formatMessage({ id: 'page.competition.detail.setDocument' })}`);
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
		<div id="competition-detail-screen" className="container-fluid" style={{ paddingBottom: '3rem' }}>
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
				min_value={_toNumber(min_value)}
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
