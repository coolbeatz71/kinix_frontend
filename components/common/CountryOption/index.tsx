import React, { FC } from 'react';
import { Select } from 'antd';
import Image from 'next/image';
import truncate from 'lodash/truncate';
import { ICountryObject } from '@interfaces/countryObject';

const { Option } = Select;

export interface ICountryOptionProps {
    key: string;
    country: ICountryObject;
}
const CountryOption: FC<ICountryOptionProps> = ({ country, key }) => {
    return (
        <Option value={country.name} key={key} label={country.name}>
            <div className="d-flex justify-content-between">
                <span>
                    <span>
                        <Image
                            width={15}
                            height={15}
                            quality={25}
                            layout="fixed"
                            src={country.flag}
                            alt={country.isoCode}
                        />
                    </span>
                    <span className="mx-2 fw-medium">
                        {truncate(country.name, {
                            length: 35,
                        })}
                    </span>
                </span>
                <span className="text-secondary">{country.dialCode}</span>
            </div>
        </Option>
    );
};

export default CountryOption;
