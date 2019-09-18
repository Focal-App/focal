import { formatDate } from "utilities/date";
import { convertPenniesToDollars, convertDollarsToPennies } from "utilities/price";

export const DefaultText = {
    noContent: "-",
}

class DataAdapter {
    static toUserModel = (apiUser) => {
        const { avatar, email, first_name, uuid } = apiUser;
        return {
            avatar,
            email,
            first_name,
            uuid
        }
    }

    static toContactModel = (apiModel) => {
        if (apiModel) {
            const { first_name, last_name, email, phone_number, label, best_time_to_contact, uuid } = apiModel;
            return {
                first_name: first_name ? first_name : DefaultText.noContent,
                last_name: last_name ? last_name : DefaultText.noContent,
                email: email ? email : DefaultText.noContent,
                phone_number: phone_number ? phone_number : DefaultText.noContent,
                label: label ? label : DefaultText.noContent,
                best_time_to_contact: best_time_to_contact ? best_time_to_contact : DefaultText.noContent,
                uuid
            }
        }
        return {
            first_name: DefaultText.noContent,
            last_name: DefaultText.noContent,
            email: DefaultText.noContent,
            phone_number: DefaultText.noContent,
            label: null,
            best_time_to_contact: DefaultText.noContent,
        }
    }

    static toClientModel = (apiClient) => {
        const { contacts, private_notes, uuid } = apiClient;
        if (contacts && contacts.length === 1) {
            contacts.push(this.toContactModel());
        }
        return {
            contacts: contacts.map((contact) => this.toContactModel(contact)),
            private_notes: private_notes ? private_notes : DefaultText.noContent,
            uuid
        }
    }

    static toTaskModel = (apiTask) => {
        const { category, is_completed, step, uuid } = apiTask;
        return {
            category: category ? category : DefaultText.noContent,
            is_completed,
            step: step ? step : DefaultText.noContent,
            uuid
        }
    }

    static toEventModel = (apiEvent) => {
        const { event_name, package_uuid, shoot_date, uuid } = apiEvent;
        return {
            event_name: event_name ? event_name : DefaultText.noContent,
            package_uuid,
            shoot_date: shoot_date ? formatDate(shoot_date) : DefaultText.noContent,
            uuid
        }
    }

    static toPackageModel = (apiPackage) => {
        if (apiPackage) {
            const { 
                package_events, 
                package_name, 
                uuid, 
                proposal_signed,
                package_contents,
                package_price,
                retainer_price,
                retainer_paid_amount,
                retainer_paid,
                discount_offered,
                balance_remaining,
                balance_received
            } = apiPackage;

            const upcoming_shoot_date = package_events.length > 0 && package_events[0].shoot_date
                ? formatDate(package_events[0].shoot_date)
                : DefaultText.noContent;

            return {
                package_name: package_name ? package_name : DefaultText.noContent,
                proposal_signed,
                package_contents: package_contents ? package_contents : DefaultText.noContent,
                package_price: package_price >= 0 ? convertPenniesToDollars(package_price) : DefaultText.noContent,
                retainer_price: retainer_price >= 0 ? convertPenniesToDollars(retainer_price) : DefaultText.noContent,
                retainer_paid_amount: retainer_paid_amount >= 0 ? convertPenniesToDollars(retainer_paid_amount) : DefaultText.noContent,
                retainer_paid,
                discount_offered: discount_offered >= 0 ? convertPenniesToDollars(discount_offered) : DefaultText.noContent,
                balance_remaining: balance_remaining >= 0 ? convertPenniesToDollars(balance_remaining) : DefaultText.noContent,
                balance_received,
                uuid,
                upcoming_shoot_date
            }
        }

        return {
            package_events: [],
            package_name: DefaultText.noContent,
            upcoming_shoot_date: DefaultText.noContent
        }
    }

    static toFullClientDataModel = (client) => {
        const data = {
            client: this.toClientModel(client),
            current_stage: this.toTaskModel(client.current_stage),
            package: this.toPackageModel(client.package),
            events: {}
        }
        if (client.package && client.package.package_events) {
            client.package.package_events.forEach((event) => {
                data.events[event.event_name] = this.toEventModel(event);
            });
        }
        return data;
    }

    static toPartialClientDataModel = (apiClient) => {
        const { client_first_name, partner_first_name, package_name, current_stage, upcoming_shoot_date, uuid } = apiClient;
        return {
            partner_first_name: partner_first_name ? partner_first_name : DefaultText.noContent,
            client_first_name: client_first_name ? client_first_name : DefaultText.noContent,
            package_name: package_name ? package_name : DefaultText.noContent,
            current_stage: this.toTaskModel(current_stage),
            upcoming_shoot_date: upcoming_shoot_date ? formatDate(upcoming_shoot_date) : DefaultText.noContent,
            uuid
        }
    }

    static toAllClientDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) {
            return [];
        }

        return apiUserClients.map(client => this.toFullClientDataModel(client))
    }

    static toAllClientPartialDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) {
            return [];
        }

        return apiUserClients.map(client => this.toPartialClientDataModel(client));
    }

    static toApiReadyClient = (values) => {
        Object.keys(values).forEach(key => {
            if (typeof values[key] === 'object') {
                DataAdapter.toApiReadyClient(values[key])
            }
            if (values[key] === DefaultText.noContent || values[key] === "") {
                values[key] = null;
            }
        })

        return values;
    }
}

export default DataAdapter;