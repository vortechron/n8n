import { LICENSE_FEATURES, UNLIMITED_LICENSE_QUOTA } from '@n8n/constants';

import { LicenseState } from '../license-state';
import type { LicenseProvider } from '../types';

describe('LicenseState', () => {
	it('enables variables without requiring a license provider entitlement', () => {
		const licensedFeatures: string[] = [];
		const valuedFeatures: string[] = [];
		const provider: LicenseProvider = {
			isLicensed: (feature) => {
				licensedFeatures.push(feature);
				return false;
			},
			getValue: (feature) => {
				valuedFeatures.push(feature);
				return undefined;
			},
		};
		const licenseState = new LicenseState();

		licenseState.setLicenseProvider(provider);

		expect(licenseState.isVariablesLicensed()).toBe(true);
		expect(licenseState.getMaxVariables()).toBe(UNLIMITED_LICENSE_QUOTA);
		expect(licensedFeatures).not.toContain(LICENSE_FEATURES.VARIABLES);
		expect(valuedFeatures).not.toContain('quota:maxVariables');
	});
});
