import {Log} from '@remotion/cli/dist/log';
import {LambdaPayload, LambdaRoutines} from '../shared/constants';
import {LambdaReturnValues} from '../shared/return-values';
import {fireHandler} from './fire';
import {progressHandler} from './get-progress';
import {infoHandler} from './info';
import {launchHandler} from './launch';
import {rendererHandler} from './renderer';
import {startHandler} from './start';

export const handler = async <T extends LambdaRoutines>(
	params: LambdaPayload
): Promise<LambdaReturnValues[T]> => {
	Log.info('Lambda parameters passed', params);
	if (params.type === LambdaRoutines.start) {
		return startHandler(params);
	}

	if (params.type === LambdaRoutines.launch) {
		return launchHandler(params);
	}

	if (params.type === LambdaRoutines.status) {
		return progressHandler(params);
	}

	if (params.type === LambdaRoutines.fire) {
		return fireHandler(params);
	}

	if (params.type === LambdaRoutines.renderer) {
		return rendererHandler(params);
	}

	if (params.type === LambdaRoutines.info) {
		return infoHandler(params);
	}

	throw new Error('Command not found');
};